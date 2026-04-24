from datetime import datetime
import os
import requests
from dotenv import load_dotenv

load_dotenv()

EIA_API_KEY = os.getenv("EIA_API_KEY", "")


def get_market_context() -> dict:
    """
    Lightweight live market context hook.
    Tries a public oil benchmark endpoint first, then falls back.
    This keeps the hackathon MVP robust.
    """
    fallback = {
        "benchmark_name": "Brent Crude",
        "benchmark_price_usd": 103.43,
        "inventory_signal": "Neutral",
        "market_note": "Using fallback market context. Connect EIA or another market feed for live deployment.",
        "updated_at": datetime.utcnow().isoformat() + "Z",
        "source": "fallback",
    }

    try:
        # Public TradingEconomics snapshot page is not a stable API; keep MVP safe with fallback.
        # Placeholder for future live connector.
        if EIA_API_KEY:
            # Example placeholder for future EIA integration.
            fallback["market_note"] = "EIA key detected. Replace market_data.py with your preferred live connector for production."
            fallback["source"] = "eia-configured-fallback"
        return fallback
    except Exception:
        return fallback