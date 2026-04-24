from typing import List, Literal, Optional
from pydantic import BaseModel, Field, field_validator


CompanyField = Literal[
    "general",
    "fnb",
    "beauty",
    "manufacturing",
    "retail",
    "service",
    "education",
    "healthcare",
    "other",
]

BusinessModel = Literal["B2C", "B2B", "Both"]

GoalType = Literal[
    "maximize_profit",
    "reduce_risk",
    "fast_sales",
    "optimize_capacity",
]

TimeHorizon = Literal["daily", "weekly", "monthly"]
PressureLevel = Literal["low", "medium", "high"]


class BusinessProfile(BaseModel):
    business_name: str
    industry_type: CompanyField
    business_model: BusinessModel
    number_of_staff: int = Field(..., ge=1)
    number_of_branches: int = Field(..., ge=1)
    monthly_revenue_range: str
    main_products_services: str
    operating_hours: str
    region_country: str


class SectorData(BaseModel):
    # Level 2 optional inputs for all SMEs
    fixed_cost: Optional[float] = Field(default=None, ge=0)
    labor_cost: Optional[float] = Field(default=None, ge=0)
    marketing_budget: Optional[float] = Field(default=None, ge=0)
    time_required_hours: Optional[float] = Field(default=None, ge=0)
    demand_confidence: Optional[float] = Field(default=None, ge=0, le=1)
    conversion_rate: Optional[float] = Field(default=None, ge=0, le=1)
    competitor_pressure: Optional[PressureLevel] = None
    customer_priority: Optional[PressureLevel] = None

    # F&B optional inputs
    ingredient_cost: Optional[float] = Field(default=None, ge=0)
    preparation_time_minutes: Optional[float] = Field(default=None, ge=0)
    spoilage_risk: Optional[float] = Field(default=None, ge=0, le=1)
    promotion_cost: Optional[float] = Field(default=None, ge=0)

    # Beauty optional inputs
    repeat_purchase_score: Optional[float] = Field(default=None, ge=0, le=10)
    packaging_cost: Optional[float] = Field(default=None, ge=0)
    campaign_cost: Optional[float] = Field(default=None, ge=0)
    review_sentiment_score: Optional[float] = Field(default=None, ge=0, le=10)

    # Manufacturing optional inputs
    machine_hours: Optional[float] = Field(default=None, ge=0)
    raw_material_cost: Optional[float] = Field(default=None, ge=0)
    defect_risk: Optional[float] = Field(default=None, ge=0, le=1)
    supplier_lead_time_days: Optional[float] = Field(default=None, ge=0)


class BusinessOption(BaseModel):
    # Level 1 mandatory inputs
    option_name: str
    company_field: CompanyField
    item_name: str
    selling_price: float = Field(..., gt=0)
    unit_cost: float = Field(..., ge=0)
    estimated_demand: float = Field(..., gt=0)
    available_capacity: float = Field(..., gt=0)
    operating_cost: float = Field(..., ge=0)
    risk_level: float = Field(..., ge=0, le=1)

    # Unstructured input for GLM interpretation
    notes: str = Field(default="")

    # Level 2 optional inputs
    sector_data: SectorData = Field(default_factory=SectorData)

    @field_validator("notes")
    @classmethod
    def trim_notes(cls, value: str) -> str:
        if not value:
            return ""
        return value[:500]


class UserContext(BaseModel):
    company_field: CompanyField
    goal: GoalType
    time_horizon: TimeHorizon
    business_profile: Optional[BusinessProfile] = None
    input_mode: Optional[Literal["basic", "advanced", "pro"]] = "basic"


class AnalyzeRequest(BaseModel):
    options: List[BusinessOption] = Field(..., min_length=2, max_length=5)
    context: UserContext


class ScenarioChange(BaseModel):
    option_name: str
    field: Literal[
        "selling_price",
        "unit_cost",
        "available_capacity",
        "estimated_demand",
        "operating_cost",
        "risk_level",
    ]
    new_value: float


class ScenarioRequest(BaseModel):
    options: List[BusinessOption] = Field(..., min_length=2, max_length=5)
    context: UserContext
    changes: List[ScenarioChange]


class ChatRequest(BaseModel):
    message: str = Field(..., max_length=1000)
    analysis_result: Optional[dict] = None


class TextExtractRequest(BaseModel):
    text: str = Field(..., max_length=2000)


class DecisionRecord(BaseModel):
    id: int
    recommended_option: str
    company_field: str
    goal: str
    confidence_score: float
    ai_mode: str
    created_at: str