export interface PlanAPIResponse {
  data: PlanAPIResponseData[];
  message: string;
  status: string;
}

export interface PlanAPIResponseData {
  planName: string;
  planSlug: string;
  extraInfo: {
    price: string;
    quantityBadges: string;
    toggleAutomatic: boolean;
  };
  description: string;
  canUpgrade: boolean;
}

export interface CurrentPlanAPIResponse {
  data: {
    planName: string;
    extraInfo: {
      price: string;
      quantityBadges: string;
      toggleAutomatic: boolean;
    };
    planInclude: {
      price: Price;
      toggleAutomatic: ToggleAutomatic;
      featuresUsedAutomatic: FeaturesUsedAutomatic;
      quantityBadges: QuantityBadgesInformation;
      productPerBadges: {
        label: string;
        name: string;
        value: string;
      };
    };
    trialDays: string;
  };
  message: string;
  status: string;
}

export interface ChargeUrlAPIResponse {
  data: {
    redirectTo: string;
  };
  message: string;
  status: string;
}

export interface CouponAPIResponse {
  data: {
    coupon: string;
    percentage: string;
    couponID: string;
  };
  message: string;
  status: string;
}
