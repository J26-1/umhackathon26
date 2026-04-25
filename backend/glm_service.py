import json
import os
from typing import Dict, List, Optional

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

ILMU_API_KEY = os.getenv("ILMU_API_KEY", "")
ILMU_BASE_URL = os.getenv("ILMU_BASE_URL", "https://api.ilmu.ai/v1")
ILMU_MODEL = os.getenv("ILMU_MODEL", "ilmu-glm-5.1")


def get_client():
    if not ILMU_API_KEY:
        return None

    return OpenAI(
        base_url=ILMU_BASE_URL,
        api_key=ILMU_API_KEY,
    )


def _fallback_recommendation(
    context: Dict,
    metrics: List[Dict],
    best: Dict,
    tradeoffs: List[str],
) -> Dict:
    return {
        "summary": (
            "Ilmu GLM-5.1 reasoning is unavailable. "
            "Ka-ching AI can calculate numerical metrics, but it cannot generate "
            "meaningful decision intelligence without GLM."
        ),
        "why_this_wins": [
            "Only numerical fallback ranking is available.",
            f"Top score option: {best['option_name']}",
            "AI interpretation, context-aware reasoning, and strategic explanation require Ilmu GLM-5.1.",
        ],
        "tradeoffs": tradeoffs,
        "actions": [
            "Connect Ilmu GLM-5.1 to enable business reasoning.",
            "Use the numerical metrics only as preliminary calculation.",
            "Do not treat this as full decision support until GLM is enabled.",
        ],
        "confidence": "Low",
        "ai_mode": "fallback_no_glm",
        "glm_required": True,
    }


def _clean_json_response(content: str) -> str:
    content = content.strip()

    if content.startswith("```"):
        content = content.replace("```json", "")
        content = content.replace("```", "")
        content = content.strip()

    return content


def generate_insight(
    context: Dict,
    metrics: List[Dict],
    best: Dict,
    tradeoffs: List[str],
    market_intelligence: Dict | None = None,
) -> Dict:
    client = get_client()

    if client is None:
        return _fallback_recommendation(context, metrics, best, tradeoffs)

    prompt = f"""
You are Ilmu GLM-5.1 powering Ka-ching AI, a decision intelligence system for SMEs.

Ka-ching AI is a decision intelligence layer on top of imperfect SME data.

The system uses a 3-level input strategy:
Level 1 Basic Mode: mandatory manual inputs.
Level 2 Advanced Mode: optional enhanced inputs with smart fallback.
Level 3 Pro Data Import: future CSV/Excel, POS, Shopee, ERP, and AI text extraction.

Your required role:
1. Interpret structured data such as revenue, profit, ROI, risk, capacity, input completeness, confidence, fallback fields, and opportunity cost.
2. Interpret unstructured text notes from SME users.
3. Generate context-aware business insights.
4. Recommend clear actions or strategies.
5. Explain decisions in simple, user-understandable language.

User context and business profile:
{json.dumps(context, indent=2)}

Calculated option metrics:
{json.dumps(metrics, indent=2)}

Best ranked option:
{json.dumps(best, indent=2)}

Tradeoffs:
{json.dumps(tradeoffs, indent=2)}

Market intelligence and latest external signal:
{json.dumps(market_intelligence or {}, indent=2)}

Return strict JSON only:
{{
  "summary": "short business paragraph",
  "why_this_wins": ["point 1", "point 2", "point 3"],
  "tradeoffs": ["point 1", "point 2", "point 3"],
  "actions": ["action 1", "action 2", "action 3"],
  "confidence": "High or Medium or Low",
  "ai_mode": "ilmu-glm-5.1",
  "glm_required": true
}}

Rules:
- Mention opportunity cost clearly.
- Mention decision confidence if relevant.
- Mention smart fallback if any optional data was missing.
- Do not claim unavailable data is certain.
- Give practical SME-friendly advice.
- Do not use markdown.
- Use market intelligence only when sources are available.
- Do not invent market trends if market signal is unknown.
"""

    try:
        response = client.chat.completions.create(
            model=ILMU_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a business decision intelligence engine, "
                        "not a generic chatbot."
                    ),
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            temperature=0.2,
        )

        content = response.choices[0].message.content
        content = _clean_json_response(content)

        return json.loads(content)

    except Exception as error:
        print("ILMU GLM error:", error)
        return _fallback_recommendation(context, metrics, best, tradeoffs)


def extract_from_text(user_text: str) -> dict:
    client = get_client()

    if client is None:
        return {
            "error": "Ilmu GLM-5.1 is required for AI text extraction."
        }

    prompt = f"""
Extract useful SME decision inputs from this unstructured text.

Text:
{user_text}

Return strict JSON only:
{{
  "selling_price": null,
  "unit_cost": null,
  "estimated_demand": null,
  "available_capacity": null,
  "operating_cost": null,
  "risk_level": null,
  "marketing_budget": null,
  "labor_cost": null,
  "fixed_cost": null,
  "notes_summary": "short summary"
}}

Use null if not mentioned.
"""

    try:
        response = client.chat.completions.create(
            model=ILMU_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": "You extract structured SME decision data from text.",
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            temperature=0.1,
        )

        content = response.choices[0].message.content
        return json.loads(_clean_json_response(content))

    except Exception as error:
        print("ILMU extraction error:", error)
        return {
            "error": "Unable to extract input from text."
        }


def chat_with_model(
    user_message: str,
    analysis_result: Optional[dict] = None,
) -> dict:
    client = get_client()

    if client is None:
        return {
            "reply": (
                "Ilmu GLM-5.1 is not connected. "
                "I can only show calculations, not full decision reasoning."
            )
        }

    context_block = (
        json.dumps(analysis_result, indent=2)
        if analysis_result
        else "No prior analysis result provided."
    )

    prompt = f"""
You are the AI assistant inside Ka-ching AI.

Current decision context:
{context_block}

User question:
{user_message}

Answer briefly and clearly.
Use the calculated metrics and explain opportunity cost, risk, prediction, confidence, smart fallback, and next action when relevant.
"""

    try:
        response = client.chat.completions.create(
            model=ILMU_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful SME decision intelligence assistant.",
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            temperature=0.4,
        )

        return {
            "reply": response.choices[0].message.content.strip()
        }

    except Exception as error:
        print("ILMU chat error:", error)

        return {
            "reply": "Unable to get Ilmu GLM-5.1 response right now."
        }