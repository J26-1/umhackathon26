from typing import Dict, List


def pick_best(metrics: List[Dict]) -> Dict:
    return max(metrics, key=lambda x: x["base_score"])


def build_tradeoffs(metrics: List[Dict], best_name: str) -> List[str]:
    tradeoffs = []

    for item in metrics:
        if item["option_name"] == best_name:
            continue

        tradeoffs.append(
            f"{item['option_name']}: expected profit RM{item['expected_profit']}, "
            f"risk {item['risk_score']}%, "
            f"decision confidence {item.get('decision_confidence', 0)}%, "
            f"opportunity cost RM{item['opportunity_cost_profit']}"
        )

    return tradeoffs