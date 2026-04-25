import json
import os
import re
from datetime import datetime
from typing import List, Dict

KB_FILE = "market_knowledge_base.json"


def normalize_text(text: str) -> str:
    text = (text or "").lower().strip()
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"[^a-z0-9\s]", "", text)
    return text


def load_kb() -> List[Dict]:
    if not os.path.exists(KB_FILE):
        return []

    try:
        with open(KB_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []


def save_kb(items: List[Dict]) -> None:
    with open(KB_FILE, "w", encoding="utf-8") as f:
        json.dump(items, f, indent=2, ensure_ascii=False)


def is_duplicate(new_item: Dict, existing_items: List[Dict]) -> bool:
    new_link = new_item.get("link", "").strip()
    new_title = normalize_text(new_item.get("title", ""))
    new_source = normalize_text(new_item.get("source_type", ""))

    for item in existing_items:
        old_link = item.get("link", "").strip()
        old_title = normalize_text(item.get("title", ""))
        old_source = normalize_text(item.get("source_type", ""))

        if new_link and old_link and new_link == old_link:
            return True

        if new_title and old_title and new_title == old_title:
            return True

        if new_title and old_title and new_source == old_source:
            title_words = set(new_title.split())
            old_words = set(old_title.split())

            if title_words and old_words:
                overlap = len(title_words & old_words) / max(len(title_words), len(old_words))
                if overlap >= 0.85:
                    return True

    return False


def add_knowledge_items(new_items: List[Dict]) -> List[Dict]:
    kb = load_kb()

    for item in new_items:
        if not is_duplicate(item, kb):
            item["stored_at"] = datetime.now().isoformat()
            kb.append(item)

    kb = kb[-300:]
    save_kb(kb)
    return kb


def rank_item(item: Dict, query: str) -> float:
    query_terms = normalize_text(query).split()

    title = normalize_text(item.get("title", ""))
    summary = normalize_text(item.get("summary", ""))
    topic = normalize_text(item.get("topic", ""))

    score = 0

    for term in query_terms:
        if term in title:
            score += 3
        if term in summary:
            score += 2
        if term in topic:
            score += 1

    source = normalize_text(item.get("source_type", ""))
    if "google news" in source:
        score += 2

    published_at = item.get("published_at", "")
    if "2026" in published_at:
        score += 4
    elif "2025" in published_at:
        score += 2

    return score


def search_knowledge(query: str, limit: int = 8) -> List[Dict]:
    kb = load_kb()

    ranked = []
    for item in kb:
        score = rank_item(item, query)
        if score > 0:
            item_copy = dict(item)
            item_copy["relevance_score"] = round(score, 2)
            ranked.append(item_copy)

    ranked.sort(key=lambda x: x.get("relevance_score", 0), reverse=True)

    return ranked[:limit]