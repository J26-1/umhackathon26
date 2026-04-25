from typing import Dict, List, Tuple
from models import BusinessOption, UserContext
from input_processor import fallback_messages


DEFAULTS = {
    # General SME fallback defaults
    "fixed_cost": 0.0,
    "labor_cost": 0.0,
    "marketing_budget": 0.0,
    "time_required_hours": 1.0,
    "demand_confidence": 0.65,
    "conversion_rate": 0.08,
    "competitor_pressure": "medium",
    "customer_priority": "medium",

    # F&B fallback defaults
    "ingredient_cost": 0.0,
    "preparation_time_minutes": 10.0,
    "spoilage_risk": 0.10,
    "promotion_cost": 0.0,

    # Beauty fallback defaults
    "repeat_purchase_score": 5.0,
    "packaging_cost": 0.0,
    "campaign_cost": 0.0,
    "review_sentiment_score": 5.0,

    # Manufacturing fallback defaults
    "machine_hours": 1.0,
    "raw_material_cost": 0.0,
    "defect_risk": 0.03,
    "supplier_lead_time_days": 7.0,
}


def safe_div(a: float, b: float) -> float:
    return a / b if b else 0.0


def level_to_score(value: str | None) -> float:
    return {
        "low": 0.2,
        "medium": 0.5,
        "high": 0.8,
    }.get(value or "medium", 0.5)


def get_value(option: BusinessOption, key: str):
    value = getattr(option.sector_data, key, None)
    return DEFAULTS[key] if value is None else value


def get_fallback_fields(option: BusinessOption) -> Tuple[List[str], int]:
    optional_fields = [
        "fixed_cost",
        "labor_cost",
        "marketing_budget",
        "time_required_hours",
        "demand_confidence",
        "conversion_rate",
        "competitor_pressure",
        "customer_priority",
    ]

    if option.company_field == "fnb":
        optional_fields += [
            "ingredient_cost",
            "preparation_time_minutes",
            "spoilage_risk",
            "promotion_cost",
        ]

    elif option.company_field == "beauty":
        optional_fields += [
            "repeat_purchase_score",
            "packaging_cost",
            "campaign_cost",
            "review_sentiment_score",
        ]

    elif option.company_field == "manufacturing":
        optional_fields += [
            "machine_hours",
            "raw_material_cost",
            "defect_risk",
            "supplier_lead_time_days",
        ]

    missing = [
        field
        for field in optional_fields
        if getattr(option.sector_data, field, None) is None
    ]

    completeness = int(max(0, 100 - len(missing) * 5))
    return missing, completeness


def sector_adjustment(option: BusinessOption) -> Dict[str, float]:
    fixed_cost = get_value(option, "fixed_cost")
    labor_cost = get_value(option, "labor_cost")
    marketing_budget = get_value(option, "marketing_budget")
    time_required_hours = get_value(option, "time_required_hours")
    demand_confidence = get_value(option, "demand_confidence")
    conversion_rate = get_value(option, "conversion_rate")
    competitor_pressure = level_to_score(get_value(option, "competitor_pressure"))
    customer_priority = level_to_score(get_value(option, "customer_priority"))

    extra_cost = fixed_cost + labor_cost + marketing_budget
    bonus = demand_confidence * 20 + conversion_rate * 50 + customer_priority * 10
    risk_add = competitor_pressure * 12
    capacity_penalty = time_required_hours * 0.4

    if option.company_field == "fnb":
        ingredient_cost = get_value(option, "ingredient_cost")
        preparation_time = get_value(option, "preparation_time_minutes")
        spoilage_risk = get_value(option, "spoilage_risk")
        promotion_cost = get_value(option, "promotion_cost")

        extra_cost += ingredient_cost + promotion_cost
        bonus += max(0, 20 - preparation_time) * 0.7
        risk_add += spoilage_risk * 100 * 0.35
        capacity_penalty += preparation_time * 0.15

    elif option.company_field == "beauty":
        repeat_score = get_value(option, "repeat_purchase_score")
        packaging_cost = get_value(option, "packaging_cost")
        campaign_cost = get_value(option, "campaign_cost")
        sentiment = get_value(option, "review_sentiment_score")

        extra_cost += packaging_cost + campaign_cost
        bonus += repeat_score * 2.2 + sentiment * 1.8
        risk_add += max(0, 5 - sentiment) * 3

    elif option.company_field == "manufacturing":
        machine_hours = get_value(option, "machine_hours")
        raw_material_cost = get_value(option, "raw_material_cost")
        defect_risk = get_value(option, "defect_risk")
        lead_time = get_value(option, "supplier_lead_time_days")

        extra_cost += raw_material_cost + machine_hours * 8
        bonus += max(0, 20 - lead_time) * 0.7
        risk_add += defect_risk * 100 * 0.45 + lead_time * 0.4
        capacity_penalty += machine_hours * 0.8

    return {
        "extra_cost": extra_cost,
        "bonus": bonus,
        "risk_add": risk_add,
        "capacity_penalty": capacity_penalty,
        "demand_confidence": demand_confidence,
        "conversion_rate": conversion_rate,
        "competitor_pressure_score": competitor_pressure,
        "customer_priority_score": customer_priority,
    }


def compute_metrics(option: BusinessOption, context: UserContext, market_signal: dict | None = None) -> Dict:
    effective_demand = min(option.available_capacity, option.estimated_demand)
    adjustment = sector_adjustment(option)
    missing_fields, input_completeness = get_fallback_fields(option)

    predicted_units = effective_demand * adjustment["demand_confidence"]

    expected_revenue = option.selling_price * predicted_units
    total_unit_cost = option.unit_cost * predicted_units
    total_cost = total_unit_cost + option.operating_cost + adjustment["extra_cost"]
    expected_profit = expected_revenue - total_cost

    margin = safe_div(option.selling_price - option.unit_cost, option.selling_price)
    roi = safe_div(expected_profit, total_cost if total_cost > 0 else 1)

    unmet_demand = max(option.estimated_demand - option.available_capacity, 0)
    stockout_risk = safe_div(
        unmet_demand,
        option.estimated_demand if option.estimated_demand > 0 else 1,
    )

    capacity_utilization = safe_div(
        effective_demand,
        option.available_capacity if option.available_capacity > 0 else 1,
    )

    risk_score = 0.0
    risk_score += option.risk_level * 100 * 0.35
    risk_score += stockout_risk * 100 * 0.25
    risk_score += adjustment["risk_add"]

    if market_signal:
        if market_signal.get("competitor_pressure_signal") == "high":
            risk_score += 8
        elif market_signal.get("competitor_pressure_signal") == "medium":
            risk_score += 4

    if expected_profit <= 0:
        risk_score += 18

    risk_score = min(max(risk_score, 0), 100)

    market_bonus = 0
    if market_signal:
        trend_score = market_signal.get("trend_score", 50)
        market_bonus = (trend_score - 50) * 0.35

        if market_signal.get("demand_signal") == "rising":
            market_bonus += 5
        elif market_signal.get("demand_signal") == "weak":
            market_bonus -= 5

    goal = context.goal

    if goal == "maximize_profit":
        base_score = (
            expected_profit * 0.50
            + roi * 100 * 0.12
            + margin * 100 * 0.12
            + (100 - risk_score) * 0.10
            + adjustment["bonus"]
            + market_bonus
        )
    elif goal == "reduce_risk":
        base_score = (
            (100 - risk_score) * 0.45
            + expected_profit * 0.18
            + margin * 100 * 0.08
            + input_completeness * 0.12
            + adjustment["bonus"]
            + market_bonus * 0.5
        )
    elif goal == "fast_sales":
        base_score = (
            predicted_units * 0.30
            + adjustment["conversion_rate"] * 100 * 0.25
            + (100 - adjustment["competitor_pressure_score"] * 100) * 0.10
            + margin * 100 * 0.08
            + adjustment["bonus"]
            + market_bonus * 1.4
        )
    else:
        base_score = (
            capacity_utilization * 100 * 0.32
            + expected_profit * 0.22
            + (100 - risk_score) * 0.12
            - adjustment["capacity_penalty"]
            + adjustment["bonus"]
            + market_bonus * 0.6
        )

    decision_confidence = min(
        100,
        max(
            0,
            input_completeness * 0.50
            + adjustment["demand_confidence"] * 100 * 0.20
            + (100 - risk_score) * 0.15
            + (market_signal.get("trend_score", 50) if market_signal else 50) * 0.15,
        ),
    )

    return {
        "option_name": option.option_name,
        "company_field": option.company_field,
        "item_name": option.item_name,
        "predicted_units": round(predicted_units, 2),
        "expected_revenue": round(expected_revenue, 2),
        "expected_profit": round(expected_profit, 2),
        "margin": round(margin * 100, 2),
        "roi": round(roi, 2),
        "risk_score": round(risk_score, 2),
        "stockout_risk": round(stockout_risk * 100, 2),
        "capacity_utilization": round(capacity_utilization * 100, 2),
        "effective_demand": round(effective_demand, 2),
        "base_score": round(base_score, 2),
        "market_bonus": round(market_bonus, 2),
        "decision_confidence": round(decision_confidence, 2),
        "input_completeness": input_completeness,
        "fallback_fields_used": missing_fields,
        "fallback_explanations": fallback_messages(missing_fields),
        "smart_fallback_used": len(missing_fields) > 0,
        "operating_cost": option.operating_cost,
        "notes": option.notes,
    }

def compute_all_metrics(
    options: List[BusinessOption],
    context: UserContext,
    market_signal: dict | None = None,
) -> List[Dict]:
    return [compute_metrics(option, context, market_signal) for option in options]


def calculate_opportunity_costs(metrics: List[Dict]) -> List[Dict]:
    if not metrics:
        return []

    best = max(metrics, key=lambda x: x["base_score"])
    best_profit = best["expected_profit"]

    updated = []

    for item in metrics:
        copy_item = dict(item)
        copy_item["opportunity_cost_profit"] = round(
            best_profit - item["expected_profit"],
            2,
        )
        copy_item["score_gap"] = round(
            best["base_score"] - item["base_score"],
            2,
        )
        updated.append(copy_item)

    return updated