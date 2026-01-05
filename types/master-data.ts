export interface MasterOption {
  value: string | number;
  label: string;
  code?: string;
  itemId?: number;
  itemOrder?: number;
}

export interface ProvinceOption extends MasterOption {
  geographyId?: number;
}

export interface DistrictOption extends MasterOption {
  provinceId?: number;
}

export interface SubDistrictOption extends MasterOption {
  districtsId?: number;
  zipCode?: string;
}

export interface TitleOption extends MasterOption {
  nameEn?: string;
  shortName?: string;
}
