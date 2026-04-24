from datetime import datetime
import csv
import io

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from models import (
    AnalyzeRequest,
    ScenarioRequest,
    DecisionRecord,
    ChatRequest,
    TextExtractRequest,
)
from calculator import compute_all_metrics, calculate_opportunity_costs
from recommender import pick_best, build_tradeoffs
from glm_service import generate_insight, chat_with_model, extract_from_text
from input_processor import (
    clean_options,
    input_limits_summary,
    MAX_CSV_ROWS,
    MAX_FILE_SIZE_MB,
)

app = FastAPI(title="Ka-ching AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

history_store = []


@app.get("/")
def root():
    return {
        "message": "Ka-ching AI backend is running",
        "ai_engine": "Ilmu GLM-5.1",
    }


@app.get("/input-limits")
def input_limits():
    return input_limits_summary()


@app.post("/analyze")
def analyze(request: AnalyzeRequest):
    cleaned_options = clean_options(request.options)

    metrics = compute_all_metrics(cleaned_options, request.context)
    metrics = calculate_opportunity_costs(metrics)

    best = pick_best(metrics)
    tradeoffs = build_tradeoffs(metrics, best["option_name"])

    insight = generate_insight(
        request.context.model_dump(),
        metrics,
        best,
        tradeoffs,
    )

    history_store.append(
        DecisionRecord(
            id=len(history_store) + 1,
            recommended_option=best["option_name"],
            company_field=best["company_field"],
            goal=request.context.goal,
            confidence_score=best.get("decision_confidence", 0),
            ai_mode=insight.get("ai_mode", "unknown"),
            created_at=datetime.now().isoformat(),
        ).model_dump()
    )

    return {
        "metrics": metrics,
        "best": best,
        "insight": insight,
        "input_policy": input_limits_summary(),
    }


@app.post("/simulate")
def simulate(request: ScenarioRequest):
    options = clean_options([opt.model_copy() for opt in request.options])

    for change in request.changes:
        for option in options:
            if option.option_name == change.option_name:
                setattr(option, change.field, change.new_value)

    metrics = compute_all_metrics(options, request.context)
    metrics = calculate_opportunity_costs(metrics)

    best = pick_best(metrics)
    tradeoffs = build_tradeoffs(metrics, best["option_name"])

    insight = generate_insight(
        request.context.model_dump(),
        metrics,
        best,
        tradeoffs,
    )

    return {
        "metrics": metrics,
        "best": best,
        "insight": insight,
    }


@app.post("/extract-text")
def extract_text(request: TextExtractRequest):
    return extract_from_text(request.text)


@app.post("/upload-csv-preview")
async def upload_csv_preview(file: UploadFile = File(...)):
    content = await file.read()

    max_size_bytes = MAX_FILE_SIZE_MB * 1024 * 1024

    if len(content) > max_size_bytes:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Maximum allowed size is {MAX_FILE_SIZE_MB} MB.",
        )

    try:
        text = content.decode("utf-8")
    except UnicodeDecodeError:
        raise HTTPException(
            status_code=400,
            detail="Unable to read file. Please upload a UTF-8 CSV file.",
        )

    reader = csv.DictReader(io.StringIO(text))
    rows = list(reader)

    if len(rows) > MAX_CSV_ROWS:
        raise HTTPException(
            status_code=400,
            detail=f"Too many rows. Maximum allowed is {MAX_CSV_ROWS} rows.",
        )

    key_columns = [
        "option_name",
        "item_name",
        "selling_price",
        "unit_cost",
        "estimated_demand",
        "available_capacity",
        "operating_cost",
        "risk_level",
        "notes",
    ]

    preview = []

    for row in rows[:10]:
        preview.append({
            key: row.get(key)
            for key in key_columns
            if key in row
        })

    return {
        "message": "CSV accepted for preview.",
        "row_count": len(rows),
        "preview_rows": preview,
        "note": "Only key decision columns are extracted. Raw CSV is not sent fully to GLM.",
    }


@app.get("/history")
def history():
    return {"history": history_store}


@app.post("/chat")
def chat(request: ChatRequest):
    return chat_with_model(
        request.message,
        request.analysis_result,
    )