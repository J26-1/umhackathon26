import re
import urllib.parse
import xml.etree.ElementTree as ET
from datetime import datetime
from typing import Dict, List
import requests

from knowledge_base import add_knowledge_items, search_knowledge


TRUSTED_SOURCE_BONUS = {
    "shopify": 4,
    "hype.my": 3,
    "prestigeonline": 3,
    "grazia": 3,
    "the rakyat post": 3,
    "says.com": 2,
    "bnm": 5,
    "department of statistics malaysia": 5,
}


def clean_text(text: str) -> str:
    text = re.sub(r"<.*?>", "", text or "")
    text = text.replace("&nbsp;", " ")
    return " ".join(text.split())


def build_query(context: dict, options: list) -> str:
    profile = context.get("business_profile") or {}
    industry = context.get("company_field", "SME")
    region = profile.get("region_country", "Malaysia")

    option_terms = " ".join(
        [
            f"{opt.get('item_name', '')} {opt.get('option_name', '')}"
            for opt in options
        ]
    )

    return f"{industry} SME market trend {option_terms} {region}"


def fetch_google_news_rss(query: str, max_items: int = 10):
    encoded = urllib.parse.quote(query)
    url = f"https://news.google.com/rss/search?q={encoded}&hl=en-MY&gl=MY&ceid=MY:en"

    try:
        response = requests.get(url, timeout=20)
        response.raise_for_status()

        root = ET.fromstring(response.content)
        items = []

        for item in root.findall(".//item")[:max_items]:
            title = clean_text(item.findtext("title"))
            link = item.findtext("link") or ""
            pub_date = item.findtext("pubDate") or ""
            description = clean_text(item.findtext("description"))

            items.append({
                "topic": query,
                "title": title,
                "link": link,
                "published_at": pub_date,
                "summary": description[:400],
                "source_type": "Google News RSS",
                "retrieved_at": datetime.now().isoformat(),
            })

        # 🔥 IMPORTANT fallback
        if not items:
            print("RSS returned empty, fallback triggered")
            return []

        return items

    except Exception as error:
        print("RSS fetch error:", error)
        return []


def source_quality_score(item: Dict) -> int:
    text = f"{item.get('title', '')} {item.get('link', '')}".lower()

    score = 0
    for source, bonus in TRUSTED_SOURCE_BONUS.items():
        if source in text:
            score += bonus

    return score


def freshness_score(item: Dict) -> int:
    published_at = item.get("published_at", "")

    if "2026" in published_at:
        return 5
    if "2025" in published_at:
        return 3
    if "2024" in published_at:
        return 1

    return 0


def keyword_score(item: Dict, query: str) -> int:
    query_terms = query.lower().split()
    text = f"{item.get('title', '')} {item.get('summary', '')} {item.get('topic', '')}".lower()

    score = 0
    for term in query_terms:
        if term in text:
            score += 1

    return score


def rank_sources(items: List[Dict], query: str) -> List[Dict]:
    ranked = []

    for item in items:
        score = (
            keyword_score(item, query)
            + freshness_score(item)
            + source_quality_score(item)
        )

        item_copy = dict(item)
        item_copy["relevance_score"] = score
        ranked.append(item_copy)

    ranked.sort(key=lambda x: x.get("relevance_score", 0), reverse=True)
    return ranked


def estimate_market_signal(items: List[Dict], query: str) -> Dict:
    if not items:
        return {
            "trend_score": 50,
            "demand_signal": "unknown",
            "competitor_pressure_signal": "unknown",
            "data_freshness": "no live source retrieved",
            "source_summary": [
                "No live market source was retrieved. Recommendation relies mainly on user input and internal scoring."
            ],
            "sources": [],
        }

    ranked_items = rank_sources(items, query)

    text = " ".join(
        [f"{x.get('title', '')} {x.get('summary', '')}" for x in ranked_items]
    ).lower()

    positive_terms = [
        "growth",
        "rising",
        "increase",
        "popular",
        "trend",
        "trending",
        "demand",
        "sales",
        "launch",
        "viral",
        "recommended",
        "hot",
    ]

    risk_terms = [
        "decline",
        "risk",
        "slowdown",
        "shortage",
        "competition",
        "pressure",
        "cost",
        "inflation",
        "drop",
        "weak",
    ]

    positive_count = sum(text.count(term) for term in positive_terms)
    risk_count = sum(text.count(term) for term in risk_terms)

    average_source_score = sum(
        item.get("relevance_score", 0) for item in ranked_items[:5]
    ) / max(len(ranked_items[:5]), 1)

    trend_score = 55 + positive_count * 4 - risk_count * 2 + average_source_score
    trend_score = int(max(20, min(95, trend_score)))

    if trend_score >= 70:
        demand_signal = "rising"
    elif trend_score >= 50:
        demand_signal = "stable"
    else:
        demand_signal = "weak"

    if risk_count >= 5:
        competitor_pressure = "high"
    elif risk_count >= 2:
        competitor_pressure = "medium"
    else:
        competitor_pressure = "low"

    return {
        "trend_score": trend_score,
        "demand_signal": demand_signal,
        "competitor_pressure_signal": competitor_pressure,
        "data_freshness": "retrieved during analysis",
        "source_summary": [item["title"] for item in ranked_items[:5]],
        "sources": [
            {
                "title": item.get("title"),
                "link": item.get("link"),
                "published_at": item.get("published_at"),
                "source_type": item.get("source_type"),
                "relevance_score": item.get("relevance_score"),
            }
            for item in ranked_items[:5]
        ],
        "query": query,
    }


def get_market_intelligence(context: dict, options: list) -> Dict:
    query = build_query(context, options)

    live_items = fetch_google_news_rss(query)
    ranked_live_items = rank_sources(live_items, query)

    add_knowledge_items(ranked_live_items)

    retrieved_items = search_knowledge(query, limit=8)
    ranked_retrieved_items = rank_sources(retrieved_items, query)

    final_items = ranked_retrieved_items or ranked_live_items

    signal = estimate_market_signal(final_items, query)

    return {
        "query": query,
        "retrieved_items": final_items[:8],
        "market_signal": signal,
    }

def keyword_score(item: Dict, query: str) -> int:
    query_terms = query.lower().split()
    text = f"{item.get('title', '')} {item.get('summary', '')}".lower()

    score = 0
    for term in query_terms:
        if term in text:
            score += 2

    # NEW: boost if core keyword present
    if "lip" in text and "serum" in text:
        score += 5

    return score