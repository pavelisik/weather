type Nullable<T> = T | null;

export interface Suggestion {
    value: string;
    unrestricted_value: string;
    data: {
        postal_code: string;
        country: string;
        country_iso_code: string;
        federal_district: Nullable<string>;
        region_fias_id: string;
        region_kladr_id: string;
        region_iso_code: Nullable<string>;
        region_with_type: string;
        region_type: string;
        region_type_full: string;
        region: string;
        area_fias_id: string;
        area_kladr_id: string;
        area_with_type: string;
        area_type: string;
        area_type_full: string;
        area: string;
        city_fias_id: string;
        city_kladr_id: string;
        city_with_type: string;
        city_type: string;
        city_type_full: string;
        city: string;
        city_area: Nullable<string>;
        city_district_fias_id: Nullable<string>;
        city_district_kladr_id: Nullable<string>;
        city_district_with_type: Nullable<string>;
        city_district_type: Nullable<string>;
        city_district_type_full: Nullable<string>;
        city_district: Nullable<string>;
        settlement_fias_id: Nullable<string>;
        settlement_kladr_id: Nullable<string>;
        settlement_with_type: Nullable<string>;
        settlement_type: Nullable<string>;
        settlement_type_full: Nullable<string>;
        settlement: Nullable<string>;
        street_fias_id: Nullable<string>;
        street_kladr_id: Nullable<string>;
        street_with_type: Nullable<string>;
        street_type: Nullable<string>;
        street_type_full: Nullable<string>;
        street: Nullable<string>;
        stead_fias_id: Nullable<string>;
        stead_cadnum: Nullable<string>;
        stead_type: Nullable<string>;
        stead_type_full: Nullable<string>;
        stead: Nullable<string>;
        house_fias_id: Nullable<string>;
        house_kladr_id: Nullable<string>;
        house_cadnum: Nullable<string>;
        house_flat_count: Nullable<string>;
        house_type: Nullable<string>;
        house_type_full: Nullable<string>;
        house: Nullable<string>;
        block_type: Nullable<string>;
        block_type_full: Nullable<string>;
        block: Nullable<string>;
        entrance: Nullable<string>;
        floor: Nullable<string>;
        flat_fias_id: Nullable<string>;
        flat_cadnum: Nullable<string>;
        flat_type: Nullable<string>;
        flat_type_full: Nullable<string>;
        flat: Nullable<string>;
        flat_area: Nullable<string>;
        square_meter_price: Nullable<string>;
        flat_price: Nullable<string>;
        room_fias_id: Nullable<string>;
        room_cadnum: Nullable<string>;
        room_type: Nullable<string>;
        room_type_full: Nullable<string>;
        room: Nullable<string>;
        postal_box: Nullable<string>;
        fias_id: string;
        fias_code: Nullable<string>;
        fias_level: string;
        fias_actuality_state: string;
        kladr_id: string;
        geoname_id: Nullable<string>;
        capital_marker: string;
        okato: string;
        oktmo: string;
        tax_office: string;
        tax_office_legal: string;
        timezone: Nullable<string>;
        geo_lat: string;
        geo_lon: string;
        beltway_hit: Nullable<string>;
        beltway_distance: Nullable<string>;
        metro: Nullable<string>;
        divisions: Nullable<string>;
        qc_geo: string;
        qc_complete: Nullable<string>;
        qc_house: Nullable<string>;
        history_values: Nullable<string>;
        unparsed_parts: Nullable<string>;
        source: Nullable<string>;
        qc: Nullable<string>;
    };
}

export interface Weather {
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: number;
    }[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
    rain?: {
        '1h': number;
    };
    snow?: {
        '1h': number;
    };
}
