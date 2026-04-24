from typing import Dict, List
from models import BusinessOption


MAX_OPTIONS = 5
MAX_NOTES_CHARS = 500
MAX_CSV_ROWS = 1000
MAX_FILE_SIZE_MB = 5


FALLBACK_EXPLANATIONS = {
    "fixed_cost": "No fixed cost provided → Ka-ching AI used SME default: RM0.",
    "labor_cost": "No labor cost provided → Ka-ching AI used SME default: RM0.",
    "marketing_budget": "No marketing budget provided → Ka-ching AI used SME default: RM0.",
    "time_required_hours": "No time required provided → Ka-ching AI used SME default: 1 hour.",
    "demand_confidence": "No demand confidence provided → Ka-ching AI used SME default: 65%.",
    "conversion_rate": "No conversion rate provided → Ka-ching AI used SME default: 8%.",
    "competitor_pressure": "No competitor pressure provided → Ka-ching AI assumed medium pressure.",
    "customer_priority": "No customer priority provided → Ka-ching AI assumed medium priority.",

    "ingredient_cost": "No ingredient cost provided → Ka-ching AI used SME default: RM0.",
    "preparation_time_minutes": "No preparation time provided → Ka-ching AI used SME default: 10 minutes.",
    "spoilage_risk": "No spoilage risk provided → Ka-ching AI used SME default: 10%.",
    "promotion_cost": "No promotion cost provided → Ka-ching AI used SME default: RM0.",

    "repeat_purchase_score": "No repeat purchase score provided → Ka-ching AI used SME default: 5/10.",
    "packaging_cost": "No packaging cost provided → Ka-ching AI used SME default: RM0.",
    "campaign_cost": "No campaign cost provided → Ka-ching AI used SME default: RM0.",
    "review_sentiment_score": "No review sentiment score provided → Ka-ching AI used SME default: 5/10.",

    "machine_hours": "No machine hours provided → Ka-ching AI used SME default: 1 hour.",
    "raw_material_cost": "No raw material cost provided → Ka-ching AI used SME default: RM0.",
    "defect_risk": "No defect risk provided → Ka-ching AI used SME default: 3%.",
    "supplier_lead_time_days": "No supplier lead time provided → Ka-ching AI used SME default: 7 days.",
}


def summarize_notes(notes: str) -> str:
    if not notes:
        return ""

    cleaned = " ".join(notes.split())

    if len(cleaned) <= MAX_NOTES_CHARS:
        return cleaned

    return cleaned[:MAX_NOTES_CHARS].rsplit(" ", 1)[0] + "..."


def clean_options(options: List[BusinessOption]) -> List[BusinessOption]:
    cleaned = []

    for option in options[:MAX_OPTIONS]:
        option.notes = summarize_notes(option.notes)
        cleaned.append(option)

    return cleaned


def fallback_messages(fallback_fields: List[str]) -> List[str]:
    return [
        FALLBACK_EXPLANATIONS.get(field, f"{field} missing → smart fallback used.")
        for field in fallback_fields
    ]


def input_limits_summary() -> Dict:
    return {
        "level_1_basic": {
            "max_options": 5,
            "mandatory_fields_per_option": 8,
            "notes_limit": "500 characters per option",
            "behavior": "Rejects more than 5 options. Notes are summarized before GLM.",
        },
        "level_2_advanced": {
            "max_options": 5,
            "fields_per_option": "25–30 fields",
            "notes_limit": "500 characters per option",
            "behavior": "Optional missing fields use smart SME fallback.",
        },
        "level_3_pro_data": {
            "csv_excel_row_limit": 1000,
            "file_size_limit": "5 MB",
            "behavior": "Files above limit are rejected. Only key columns are extracted.",
        },
    }