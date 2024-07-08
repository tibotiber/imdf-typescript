import { Feature as GeoJsonFeature, Geometry, LineString, Point, Polygon, MultiPolygon } from "geojson";
export declare type Polygonal = Polygon | MultiPolygon;
export interface Door {
    type: DOOR_TYPE | null;
    automatic: boolean | null;
    material: "wood" | "glass" | "metal" | "gate" | null;
}
interface FeatureReference {
    id: FeatureId;
    feature_type: FeatureType;
}
export declare enum FeatureType {
    "address" = "address",
    "amenity" = "amenity",
    "anchor" = "anchor",
    "building" = "building",
    "detail" = "detail",
    "fixture" = "fixture",
    "footprint" = "footprint",
    "geofence" = "geofence",
    "kiosk" = "kiosk",
    "level" = "level",
    "occupant" = "occupant",
    "opening" = "opening",
    "relationship" = "relationship",
    "section" = "section",
    "unit" = "unit",
    "venue" = "venue"
}
export interface Labels {
    [key: string]: string;
}
export interface Temporality {
    start: string;
    end: string;
    modified: string;
}
export declare type Hours = string;
export declare type Phone = string;
export declare type Website = string;
export declare type ISO3166 = string;
export declare type ISO3166_2 = string;
export declare type FeatureId = string;
export declare type AddressId = FeatureId;
export declare type AmenityId = FeatureId;
export declare type AnchorId = FeatureId;
export declare type BuildingId = FeatureId;
export declare type DetailId = FeatureId;
export declare type FixtureId = FeatureId;
export declare type FootprintId = FeatureId;
export declare type GeofenceId = FeatureId;
export declare type KioskId = FeatureId;
export declare type LevelId = FeatureId;
export declare type OccupantId = FeatureId;
export declare type OpeningId = FeatureId;
export declare type RelationshipId = FeatureId;
export declare type SectionId = FeatureId;
export declare type UnitId = FeatureId;
export declare type VenueId = FeatureId;
/**
 * Base properties for all IMDF features
 */
export declare type FeatureProperties = {};
/**
 * Provide a better default value for GeoJsonFeature (Feature in geojson).
 * This makes the type Feature to be used in generic types much easier.
 */
export interface Feature<P extends FeatureProperties = FeatureProperties> extends GeoJsonFeature<Geometry | null, P> {
    feature_type: string;
}
interface Properties extends Record<string, any> {
}
export interface NamedFeatureProperties extends Properties {
    name: Labels | null;
    alt_name?: Labels | null;
    display_point?: DisplayPoint | null;
}
export interface LabeledFeatureProperties extends NamedFeatureProperties {
    level_id: LevelId;
    display_point: DisplayPoint | null;
}
/**
 * Features that have a name
 */
export interface NamedFeature<Properties extends NamedFeatureProperties = NamedFeatureProperties> extends Feature<Properties> {
}
/**
 * Features that have a name and a label position
 */
export interface LabeledFeature<Properties extends LabeledFeatureProperties = LabeledFeatureProperties> extends NamedFeature<Properties> {
}
/**
 * Address object
 * https://docs.ogc.org/cs/20-094/Address/index.html
 */
export interface Address extends Feature {
    id: AddressId;
    feature_type: FeatureType.address;
    geometry: null;
    properties: FeatureProperties & {
        address: string;
        unit: string | null;
        locality: string;
        province: ISO3166_2 | null;
        country: ISO3166;
        postal_code: string | null;
        postal_code_ext: string | null;
        postal_code_vanity: string | null;
    };
}
/**
 * Amenity object
 * https://docs.ogc.org/cs/20-094/Amenity/index.html
 */
export interface Amenity extends NamedFeature {
    id: AmenityId;
    feature_type: FeatureType.amenity;
    geometry: Point;
    properties: FeatureProperties & {
        category: AMENITY_CATEGORY;
        accessibility: ACCESSIBILITY_CATEGORY | null;
        name: Labels | null;
        alt_name: Labels | null;
        hours: Hours | null;
        phone: Phone | null;
        website: Website | null;
        unit_ids: Array<UnitId>;
        address_id: AddressId | null;
        correlation_id: AmenityId | null;
    };
}
/**
 * Anchor object
 * https://docs.ogc.org/cs/20-094/Anchor/index.html
 */
export interface Anchor extends Feature {
    id: AnchorId;
    feature_type: FeatureType.anchor;
    geometry: Point;
    properties: FeatureProperties & {
        address_id: AddressId | null;
        unit_id: UnitId;
    };
}
export interface BuildingProperties extends NamedFeatureProperties {
    category: BUILDING_CATEGORY;
    restriction: RESTRICTION_CATEGORY;
    name: Labels | null;
    alt_name: Labels | null;
    display_point: DisplayPoint | null;
    address_id: AddressId | null;
}
/**
 * Building object
 * https://docs.ogc.org/cs/20-094/Building/index.html
 */
export interface Building extends NamedFeature<BuildingProperties> {
    id: BuildingId;
    feature_type: FeatureType.building;
    geometry: null;
    properties: BuildingProperties;
}
/**
 * Detail object
 * https://docs.ogc.org/cs/20-094/Detail/index.html
 */
export interface Detail extends Feature {
    id: DetailId;
    feature_type: FeatureType.detail;
    properties: FeatureProperties & {
        level_id: LevelId;
    };
}
/**
 * Fixture object
 * https://docs.ogc.org/cs/20-094/Fixture/index.html
 */
export interface Fixture extends LabeledFeature {
    id: FixtureId;
    feature_type: FeatureType.fixture;
    geometry: Polygonal;
    properties: FeatureProperties & {
        category: FIXTURE_CATEGORY;
        name: Labels | null;
        alt_name: Labels | null;
        anchor_id: AnchorId | null;
        level_id: LevelId;
        display_point: DisplayPoint | null;
    };
}
/**
 * Footprint object
 * https://docs.ogc.org/cs/20-094/Footprint/index.html
 */
export interface Footprint extends Feature {
    id: FootprintId;
    feature_type: FeatureType.footprint;
    geometry: Polygonal;
    properties: FeatureProperties & {
        category: FOOTPRINT_CATEGORY;
        name: Labels | null;
        building_ids: Array<BuildingId>;
    };
}
/**
 * Geofence object
 * https://docs.ogc.org/cs/20-094/Geofence/index.html
 */
export interface Geofence extends Feature {
    id: GeofenceId;
    feature_type: FeatureType.geofence;
    geometry: Polygonal;
    properties: FeatureProperties & {
        category: GEOFENCE_CATEGORY;
    };
}
export interface KioskProperties extends NamedFeatureProperties {
    name: Labels;
    alt_name: Labels;
    anchorId: AnchorId | null;
    levelId: LevelId | null;
    display_point: DisplayPoint | null;
}
/**
 * Kiosk object
 * https://docs.ogc.org/cs/20-094/kiosk/index.html
 */
export interface Kiosk extends NamedFeature<KioskProperties> {
    id: KioskId;
    feature_type: FeatureType.kiosk;
    geometry: Polygonal;
    properties: KioskProperties;
}
export interface LevelProperties extends NamedFeatureProperties {
    category: LEVEL_CATEGORY;
    restriction: RESTRICTION_CATEGORY | null;
    outdoor: boolean;
    ordinal: number;
    name: Labels;
    short_name: Labels;
    display_point: DisplayPoint | null;
    address_id: AddressId | null;
    building_ids: Array<BuildingId> | null;
}
/**
 * Level object
 * https://docs.ogc.org/cs/20-094/Level/index.html
 */
export interface Level extends NamedFeature<LevelProperties> {
    id: LevelId;
    feature_type: FeatureType.level;
    geometry: Polygonal;
    properties: LevelProperties;
}
/**
 * Occupant object
 * https://docs.ogc.org/cs/20-094/Occupant/index.html
 */
export interface Occupant extends Feature {
    id: OccupantId;
    feature_type: FeatureType.occupant;
    geometry: null;
    properties: FeatureProperties & {
        name: Labels;
        category: OCCUPANT_CATEGORY;
        anchor_id: AnchorId;
        hours: Hours | null;
        phone: Phone | null;
        website: Website | null;
        validity: Temporality | null;
        correlation_id: OccupantId | null;
    };
}
/**
 * Opening object
 * https://docs.ogc.org/cs/20-094/Opening/index.html
 */
export interface Opening extends LabeledFeature {
    id: OpeningId;
    feature_type: FeatureType.opening;
    geometry: LineString;
    properties: LabeledFeatureProperties & {
        category: OPENING_CATEGORY;
        accessibility: ACCESSIBILITY_CATEGORY | null;
        access_control: ACCESS_CONTROL_CATEGORY | null;
        door: Door | null;
        name: Labels | null;
        alt_name: Labels | null;
        display_point: DisplayPoint | null;
        level_id: LevelId;
    };
}
/**
 * Relationship object
 * https://docs.ogc.org/cs/20-094/Relationship/index.html
 */
export interface Relationship extends Feature {
    id: RelationshipId;
    feature_type: FeatureType.relationship;
    geometry: Geometry | null;
    properties: FeatureProperties & {
        category: RELATIONSHIP_CATEGORY;
        direction: "directed" | "undirected";
        origin: FeatureReference | null;
        intermediary: FeatureReference | null;
        destination: FeatureReference | null;
        hours: Hours | null;
    };
}
/**
 * Section object
 * https://docs.ogc.org/cs/20-094/Section/index.html
 */
export interface Section extends LabeledFeature {
    id: SectionId;
    feature_type: FeatureType.section;
    geometry: Polygonal;
    properties: LabeledFeatureProperties & {
        category: SECTION_CATEGORY;
        restriction: RESTRICTION_CATEGORY | null;
        accessibility: ACCESSIBILITY_CATEGORY | null;
        name: Labels | null;
        alt_name: Labels | null;
        display_point: DisplayPoint | null;
        level_id: LevelId;
        address_id: AddressId | null;
        correlation_id: SectionId | null;
        parents: SectionId | null;
    };
}
export interface UnitProperties extends LabeledFeatureProperties {
    category: UNIT_CATEGORY;
    restriction: RESTRICTION_CATEGORY | null;
    accessibility: ACCESSIBILITY_CATEGORY | null;
    name: Labels | null;
    alt_name: Labels | null;
    level_id: LevelId;
    display_point: DisplayPoint | null;
}
/**
 * Unit object
 * https://docs.ogc.org/cs/20-094/Unit/index.html
 */
export interface Unit extends LabeledFeature<UnitProperties> {
    id: UnitId;
    feature_type: FeatureType.unit;
    geometry: Polygonal;
    properties: UnitProperties;
}
/**
 * Venue object
 * https://docs.ogc.org/cs/20-094/Venue/index.html
 */
export interface Venue extends NamedFeature {
    id: VenueId;
    feature_type: FeatureType.venue;
    geometry: Polygonal;
    properties: FeatureProperties & {
        category: VENUE_CATEGORY;
        restriction: RESTRICTION_CATEGORY | null;
        name: Labels;
        alt_name: Labels | null;
        hours: Hours | null;
        phone: Phone | null;
        website: Website | null;
        display_point: DisplayPoint;
        address_id: AddressId;
    };
}
export interface DisplayPoint extends Point {
}
/**
 * Access control categories
 * https://docs.ogc.org/cs/20-094/Categories/index.html#access-control
 */
export declare enum ACCESS_CONTROL_CATEGORY {
    "badgereader" = "badgereader",
    "fingerprintreader" = "fingerprintreader",
    "guard" = "guard",
    "keyaccess" = "keyaccess",
    "outofservice" = "outofservice",
    "passwordaccess" = "passwordaccess",
    "retinascanner" = "retinascanner",
    "voicerecognition" = "voicerecognition"
}
/**
 * Accessibility categories
 * https://docs.ogc.org/cs/20-094/Categories/index.html#accessibility
 */
export declare enum ACCESSIBILITY_CATEGORY {
    "assisted.listening" = "assisted.listening",
    braille = "braille",
    hearing = "hearing",
    hearingloop = "hearingloop",
    signlanginterpreter = "signlanginterpreter",
    tactilepaving = "tactilepaving",
    tdd = "tdd",
    trs = "trs",
    volume = "volume",
    wheelchair = "wheelchair"
}
/**
 * Amenity categories
 * https://docs.ogc.org/cs/20-094/Categories/index.html#amenity
 */
export declare enum AMENITY_CATEGORY {
    amphitheater = "amphitheater",
    animalreliefarea = "animalreliefarea",
    arrivalgate = "arrivalgate",
    atm = "atm",
    babychanging = "babychanging",
    baggagecarousel = "baggagecarousel",
    "baggagecarousel.intl" = "baggagecarousel.intl",
    baggagecarts = "baggagecarts",
    baggageclaim = "baggageclaim",
    "baggageclaim.oversize" = "baggageclaim.oversize",
    baggagerecheck = "baggagerecheck",
    baggagestorage = "baggagestorage",
    boardinggate = "boardinggate",
    "boardinggate.aircraft" = "boardinggate.aircraft",
    "boardinggate.bus" = "boardinggate.bus",
    "boardinggate.ferry" = "boardinggate.ferry",
    "boardinggate.train" = "boardinggate.train",
    bus = "bus",
    "bus.muni" = "bus.muni",
    "bus.national" = "bus.national",
    businesscenter = "businesscenter",
    cabin = "cabin",
    caregiver = "caregiver",
    carrental = "carrental",
    cashier = "cashier",
    changemachine = "changemachine",
    checkin = "checkin",
    "checkin.desk" = "checkin.desk",
    "checkin.desk.oversizebaggage" = "checkin.desk.oversizebaggage",
    "checkin.desk.transfer" = "checkin.desk.transfer",
    "checkin.selfservice" = "checkin.selfservice",
    childplayarea = "childplayarea",
    coinlocker = "coinlocker",
    copymachine = "copymachine",
    defibrillator = "defibrillator",
    drinkingfountain = "drinkingfountain",
    eatingdrinking = "eatingdrinking",
    elevator = "elevator",
    emergencyshelter = "emergencyshelter",
    entry = "entry",
    escalator = "escalator",
    exhibit = "exhibit",
    faregate = "faregate",
    "faregate.oversized" = "faregate.oversized",
    fieldofplay = "fieldofplay",
    "fieldofplay.americanfootball" = "fieldofplay.americanfootball",
    "fieldofplay.baseball" = "fieldofplay.baseball",
    "fieldofplay.basketball" = "fieldofplay.basketball",
    "fieldofplay.fieldhockey" = "fieldofplay.fieldhockey",
    "fieldofplay.icehockey" = "fieldofplay.icehockey",
    "fieldofplay.rugby" = "fieldofplay.rugby",
    "fieldofplay.soccer" = "fieldofplay.soccer",
    "fieldofplay.softball" = "fieldofplay.softball",
    "fieldofplay.tennis" = "fieldofplay.tennis",
    "fieldofplay.trackfield" = "fieldofplay.trackfield",
    "fieldofplay.volleyball" = "fieldofplay.volleyball",
    "firealarmpullstation" = "firealarmpullstation",
    "fireextinguisher" = "fireextinguisher",
    firstaid = "firstaid",
    fittingroom = "fittingroom",
    foodservice = "foodservice",
    gatearea = "gatearea",
    groundtransportation = "groundtransportation",
    guestservices = "guestservices",
    handsanitizerstation = "handsanitizerstation",
    healthscreening = "healthscreening",
    hoteling = "hoteling",
    immigration = "immigration",
    information = "information",
    "information.bid" = "information.bid",
    "information.carrental" = "information.carrental",
    "information.hotel" = "information.hotel",
    "information.mufid" = "information.mufid",
    "information.mufid.arrivals" = "information.mufid.arrivals",
    "information.mufid.departures" = "information.mufid.departures",
    "information.transit" = "information.transit",
    landmark = "landmark",
    library = "library",
    limo = "limo",
    lostandfound = "lostandfound",
    mailbox = "mailbox",
    meditation = "meditation",
    meetingpoint = "meetingpoint",
    mobilityrescue = "mobilityrescue",
    mothersroom = "mothersroom",
    movingwalkway = "movingwalkway",
    paidarea = "paidarea",
    parkandride = "parkandride",
    parking = "parking",
    "parking.bicycle" = "parking.bicycle",
    "parking.compact" = "parking.compact",
    "parking.ev" = "parking.ev",
    "parking.longterm" = "parking.longterm",
    "parking.motorcycle" = "parking.motorcycle",
    "parking.shortterm" = "parking.shortterm",
    "parking.waitingarea" = "parking.waitingarea",
    payphone = "payphone",
    pedestriancrossing = "pedestriancrossing",
    peoplemover = "peoplemover",
    phone = "phone",
    "phone.emergency" = "phone.emergency",
    photobooth = "photobooth",
    platform = "platform",
    police = "police",
    powerchargingstation = "powerchargingstation",
    prayerroom = "prayerroom",
    "prayerroom.buddhism" = "prayerroom.buddhism",
    "prayerroom.christianity" = "prayerroom.christianity",
    "prayerroom.hinduism" = "prayerroom.hinduism",
    "prayerroom.islam" = "prayerroom.islam",
    "prayerroom.islam.female" = "prayerroom.islam.female",
    "prayerroom.islam.male" = "prayerroom.islam.male",
    "prayerroom.judaism" = "prayerroom.judaism",
    "prayerroom.shintoism" = "prayerroom.shintoism",
    "prayerroom.sikh" = "prayerroom.sikh",
    "prayerroom.taoic" = "prayerroom.taoic",
    privatelounge = "privatelounge",
    productreturn = "productreturn",
    "rail.muni" = "rail.muni",
    "rail.national" = "rail.national",
    ramp = "ramp",
    "reception.desk" = "reception.desk",
    recreation = "recreation",
    restroom = "restroom",
    "restroom.family" = "restroom.family",
    "restroom.female" = "restroom.female",
    "restroom.female.wheelchair" = "restroom.female.wheelchair",
    "restroom.male" = "restroom.male",
    "restroom.male.wheelchair" = "restroom.male.wheelchair",
    "restroom.transgender" = "restroom.transgender",
    "restroom.transgender.wheelchair" = "restroom.transgender.wheelchair",
    "restroom.unisex" = "restroom.unisex",
    "restroom.unisex.wheelchair" = "restroom.unisex.wheelchair",
    "restroom.wheelchair" = "restroom.wheelchair",
    rideshare = "rideshare",
    seat = "seat",
    seating = "seating",
    security = "security",
    "security.checkpoint" = "security.checkpoint",
    "security.inspection" = "security.inspection",
    service = "service",
    shower = "shower",
    shuttle = "shuttle",
    sleepbox = "sleepbox",
    smokingarea = "smokingarea",
    stairs = "stairs",
    storage = "storage",
    strollerrental = "strollerrental",
    studentadmissions = "studentadmissions",
    studentservices = "studentservices",
    swimmingpool = "swimmingpool",
    "swimmingpool.children" = "swimmingpool.children",
    "swimmingpool.family" = "swimmingpool.family",
    taxi = "taxi",
    ticketing = "ticketing",
    "ticketing.airline" = "ticketing.airline",
    "ticketing.bus" = "ticketing.bus",
    "ticketing.bus.muni" = "ticketing.bus.muni",
    "ticketing.bus.national" = "ticketing.bus.national",
    "ticketing.rail" = "ticketing.rail",
    "ticketing.rail.muni" = "ticketing.rail.muni",
    "ticketing.rail.national" = "ticketing.rail.national",
    "ticketing.shuttle" = "ticketing.shuttle",
    traintrack = "traintrack",
    transit = "transit",
    unspecified = "unspecified",
    valet = "valet",
    vendingmachine = "vendingmachine",
    "vendingmachine.trainticket" = "vendingmachine.trainticket",
    wheelchairassist = "wheelchairassist",
    wifi = "wifi",
    yoga = "yoga"
}
/**
 * Building categories
 * https://docs.ogc.org/cs/20-094/Categories/index.html#building
 */
export declare enum BUILDING_CATEGORY {
    parking = "parking",
    transit = "transit",
    "transit.bus" = "transit.bus",
    "transit.train" = "transit.train",
    unspecified = "unspecified"
}
/**
 * Door categories
 * https://docs.ogc.org/cs/20-094/Categories/index.html#door
 */
export declare enum DOOR_CATEGORY {
    door = "door",
    movablepartition = "movablepartition",
    open = "open",
    revolving = "revolving",
    shutter = "shutter",
    sliding = "sliding",
    swinging = "swinging",
    turnstile = "turnstile",
    "turnstile.fullheight" = "turnstile.fullheight",
    "turnstile.waistheight" = "turnstile.waistheight",
    unspecified = "unspecified"
}
/**
 * Door types
 * https://docs.ogc.org/cs/20-094/Reference/index.html#door
 */
export declare enum DOOR_TYPE {
    movablepartition = "movablepartition",
    open = "open",
    revolving = "revolving",
    shutter = "shutter",
    sliding = "sliding",
    swinging = "swinging",
    turnstile = "turnstile",
    "turnstile.fullheight" = "turnstile.fullheight",
    "turnstile.waistheight" = "turnstile.waistheight"
}
/**
 * Fixture categories
 *
 */
export declare enum FIXTURE_CATEGORY {
    baggagecarousel = "baggagecarousel",
    "boardinggate.desk" = "boardinggate.desk",
    "checkin.desk" = "checkin.desk",
    "checkin.kiosk" = "checkin.kiosk",
    desk = "desk",
    equipment = "equipment",
    furniture = "furniture",
    "immigration.desk" = "immigration.desk",
    "inspection.desk" = "inspection.desk",
    obstruction = "obstruction",
    securityequipment = "securityequipment",
    stage = "stage",
    vegetation = "vegetation",
    wall = "wall"
}
/**
 * Footprint categories
 * https://docs.ogc.org/cs/20-094/Categories/index.html#footprint
 */
export declare enum FOOTPRINT_CATEGORY {
    aerial = "aerial",
    ground = "ground",
    subterranean = "subterranean"
}
/**
 * Geofence categories
 * https://docs.ogc.org/cs/20-094/Categories/index.html#geofence
 */
export declare enum GEOFENCE_CATEGORY {
    concourse = "concourse",
    geofence = "geofence",
    paidarea = "paidarea",
    platform = "platform",
    postsecurity = "postsecurity",
    presecurity = "presecurity",
    terminal = "terminal",
    underconstruction = "underconstruction"
}
/**
 * Level categories
 * https://docs.ogc.org/cs/20-094/Categories/index.html#level
 */
export declare enum LEVEL_CATEGORY {
    arrivals = "arrivals",
    "arrivals.domestic" = "arrivals.domestic",
    "arrivals.intl" = "arrivals.intl",
    departures = "departures",
    "departures.domestic" = "departures.domestic",
    "departures.intl" = "departures.intl",
    parking = "parking",
    transit = "transit",
    unspecified = "unspecified"
}
/**
 * Occupant categories
 * https://docs.ogc.org/cs/20-094/Categories/index.html#occupant
 */
export declare enum OCCUPANT_CATEGORY {
    "3dprinting" = 0,
    acai = 1,
    accessories = 2,
    accounting = 3,
    acnetreatment = 4,
    acupuncture = 5,
    adoptionservices = 6,
    adulteducation = 7,
    adultentertainment = 8,
    adultstore = 9,
    advertising = 10,
    advisoryservices = 11,
    afghani = 12,
    african = 13,
    agritourism = 14,
    airfield = 15,
    airline = 16,
    "airport.regional" = 17,
    airportloungebar = 18,
    airportshuttle = 19,
    airsoft = 20,
    allergies = 21,
    alternativemedicine = 22,
    "american.modern" = 23,
    amusementpark = 24,
    "amusementpark.ride" = 25,
    animalshelter = 26,
    antiques = 27,
    apmstop = 28,
    appliances = 29,
    arabian = 30,
    "arabian.pizza" = 31,
    arcade = 32,
    archery = 33,
    architecture = 34,
    argentine = 35,
    armenian = 36,
    artgallery = 37,
    artinstruction = 38,
    "arts.entertainment" = 39,
    artsandcrafts = 40,
    artschool = 41,
    artstudio = 42,
    "artstudio.rental" = 43,
    artsupplies = 44,
    asianfusion = 45,
    astrologist = 46,
    asturian = 47,
    atm = 48,
    "atm.cryptocurrency" = 49,
    audiovideoequipment = 50,
    auditory = 51,
    australian = 52,
    "australian.modern" = 53,
    austrian = 54,
    "austrian.schnitzel" = 55,
    "auto.accessibilityequipment" = 56,
    "auto.bodyshop" = 57,
    "auto.carbuyer" = 58,
    "auto.carshare" = 59,
    "auto.carwash" = 60,
    "auto.dealer.boat" = 61,
    "auto.dealer.car" = 62,
    "auto.dealer.motorcycle" = 63,
    "auto.dealer.rv" = 64,
    "auto.dentrepair.mobile" = 65,
    "auto.detailing" = 66,
    "auto.electric" = 67,
    "auto.evcharge" = 68,
    "auto.evcharge.dcfast" = 69,
    "auto.evcharge.tesla" = 70,
    "auto.glass" = 71,
    "auto.oilchange" = 72,
    "auto.parts" = 73,
    "auto.repair" = 74,
    "auto.repair.transmission" = 75,
    "auto.repair.wheelrim" = 76,
    "auto.repair.windshield" = 77,
    "auto.servicestation" = 78,
    "auto.shipping" = 79,
    "auto.stereoinstallation" = 80,
    "auto.tires" = 81,
    "auto.upholstery" = 82,
    automotive = 83,
    autopartssupplies = 84,
    babyclothesandsupplies = 85,
    bagels = 86,
    bakedgoods = 87,
    ballonservices = 88,
    bangladeshi = 89,
    bank = 90,
    bar = 91,
    barbecue = 92,
    barber = 93,
    barfood = 94,
    barreclass = 95,
    baseballfield = 96,
    bathingarea = 97,
    batteries = 98,
    battingcages = 99,
    beach = 100,
    beautysalon = 101,
    beautyspas = 102,
    bedbreakfast = 103,
    beerbar = 104,
    beergarden = 105,
    beerhall = 106,
    beerwineandspirits = 107,
    beerwinespirits = 108,
    beisl = 109,
    belgian = 110,
    "belgian.flemish" = 111,
    bengali = 112,
    beveragestore = 113,
    "bicycle.repair" = 114,
    bicyclerental = 115,
    bicycleshop = 116,
    bikesandequipment = 117,
    billingservices = 118,
    bingo = 119,
    biryani = 120,
    bistro = 121,
    blacksea = 122,
    blinds = 123,
    blooddonation = 124,
    blooddonationcenter = 125,
    bodycontouring = 126,
    bodypiercing = 127,
    books = 128,
    booksmagazinesmusicvideo = 129,
    botanicalgarden = 130,
    bowlingalley = 131,
    boxing = 132,
    brazilian = 133,
    "brazilian.centralbrazil" = 134,
    "brazilian.empanadas" = 135,
    "brazilian.northeasternbrazil" = 136,
    "brazilian.northernbrazil" = 137,
    breakfastandbrunch = 138,
    brewery = 139,
    brewpub = 140,
    bridalstore = 141,
    british = 142,
    bubbletea = 143,
    buffet = 144,
    buildingsupplies = 145,
    bulgarian = 146,
    bulkmedicalbilling = 147,
    bungeejumping = 148,
    burgers = 149,
    burmese = 150,
    businesscampus = 151,
    businessconsulting = 152,
    busrental = 153,
    busstop = 154,
    butcher = 155,
    cabinets = 156,
    cafe = 157,
    cafeteria = 158,
    cajun = 159,
    cakes = 160,
    calligraphy = 161,
    cambodian = 162,
    "canadian.modern" = 163,
    candy = 164,
    "candy.dagashi" = 165,
    cannabisdispensary = 166,
    canteen = 167,
    cardioclasses = 168,
    cardiology = 169,
    "cards.stationery" = 170,
    careercounseling = 171,
    caribbean = 172,
    caricaturist = 173,
    carouselride = 174,
    carpet = 175,
    carrental = 176,
    catering = 177,
    cellphoneaccessories = 178,
    challengecourse = 179,
    champagnebar = 180,
    cheese = 181,
    cheesesteaks = 182,
    chickenshop = 183,
    chickenwings = 184,
    childbirthschool = 185,
    childcare = 186,
    chilean = 187,
    chimneycakes = 188,
    chinese = 189,
    "chinese.cantonese" = 190,
    "chinese.dimsum" = 191,
    "chinese.fuzhou" = 192,
    "chinese.hainan" = 193,
    "chinese.hakka" = 194,
    "chinese.henghwa" = 195,
    "chinese.hokkien" = 196,
    "chinese.hunan" = 197,
    "chinese.pekinese" = 198,
    "chinese.shanghainese" = 199,
    "chinese.szechuan" = 200,
    "chinese.teochew" = 201,
    chinesebazaar = 202,
    chiropractic = 203,
    chocolate = 204,
    christmastrees = 205,
    churros = 206,
    cider = 207,
    cigarbar = 208,
    cinema = 209,
    cityhall = 210,
    climbing = 211,
    clinic = 212,
    clockrepair = 213,
    clothing = 214,
    "clothing.bespoke" = 215,
    "clothing.childrens" = 216,
    "clothing.mens" = 217,
    "clothing.plussize" = 218,
    "clothing.womens" = 219,
    cocktailbar = 220,
    coffee = 221,
    "coffee.tea" = 222,
    coffeeroaster = 223,
    coffeeteasupplies = 224,
    coincashingkiosk = 225,
    college = 226,
    colombian = 227,
    comedyclub = 228,
    comfortfood = 229,
    comicbooks = 230,
    commercialrealestate = 231,
    commissionedartists = 232,
    communitybookbox = 233,
    communitycenter = 234,
    computersandaccessories = 235,
    conceptshop = 236,
    concourse = 237,
    condominium = 238,
    congee = 239,
    constructionequipmentrental = 240,
    contractors = 241,
    conveniencestore = 242,
    conveyorsushi = 243,
    "cooking.instruction" = 244,
    cookingschool = 245,
    copyshop = 246,
    corporateheadquarters = 247,
    corporateoffices = 248,
    corsican = 249,
    cosmetics = 250,
    cosmeticsurgery = 251,
    cosmetologyschool = 252,
    costumes = 253,
    countertopinstallation = 254,
    countryclub = 255,
    courier = 256,
    crepes = 257,
    cryotherapy = 258,
    cuban = 259,
    culturalcenter = 260,
    cupcakes = 261,
    currencyexchange = 262,
    customcakes = 263,
    custommerchandise = 264,
    cyclingclass = 265,
    cypriot = 266,
    czech = 267,
    danceclub = 268,
    danceschool = 269,
    dancestudio = 270,
    dancewear = 271,
    danish = 272,
    datarecovery = 273,
    dayspa = 274,
    "dealer.usedvehicle" = 275,
    delicatessen = 276,
    "delicatessen.sandwiches" = 277,
    dentalhygiene = 278,
    dentistry = 279,
    "dentistry.cosmetic" = 280,
    "dentistry.general" = 281,
    "dentistry.pediatric" = 282,
    departmentstore = 283,
    deptartmentstore = 284,
    dermatology = 285,
    desserts = 286,
    diagnosticimaging = 287,
    diagnosticservices = 288,
    dialysis = 289,
    dietician = 290,
    digitizingservices = 291,
    diner = 292,
    dinnertheater = 293,
    discountstore = 294,
    distillery = 295,
    divebar = 296,
    diyfood = 297,
    dmv = 298,
    dominican = 299,
    donair = 300,
    donationcenter = 301,
    donuts = 302,
    doorsalesandinstallation = 303,
    drivingrange = 304,
    drivingschool = 305,
    drycleaning = 306,
    drycleaninglaundry = 307,
    dumplings = 308,
    dumpsterrental = 309,
    dutyfree = 310,
    earnosethroat = 311,
    easterneuropean = 312,
    eatertainment = 313,
    editorialservices = 314,
    education = 315,
    educationservices = 316,
    egyptian = 317,
    electricians = 318,
    electronicappliances = 319,
    electronicparts = 320,
    electronicsrepair = 321,
    elementaryschool = 322,
    embroiderycrochet = 323,
    emergencymedicine = 324,
    emissionstesting = 325,
    empanadas = 326,
    employmentagency = 327,
    endodontics = 328,
    engraving = 329,
    escapegame = 330,
    ethiopian = 331,
    ethnicgrocerystore = 332,
    "european.modern" = 333,
    eventplanning = 334,
    eventspace = 335,
    experiences = 336,
    eyelashes = 337,
    "eyewear.opticians" = 338,
    fabricstore = 339,
    fairground = 340,
    falafel = 341,
    familyfriendly = 342,
    familyfuncenter = 343,
    familymedicine = 344,
    familyplanning = 345,
    familyrestaurant = 346,
    farm = 347,
    farmersmarket = 348,
    fashion = 349,
    fashionaccessories = 350,
    fastfood = 351,
    fencing = 352,
    fengshui = 353,
    ferry = 354,
    fieldofplay = 355,
    filipino = 356,
    financialservices = 357,
    fingerprinting = 358,
    firearmstrainingschool = 359,
    fish = 360,
    fishandchips = 361,
    fitnessbootcamp = 362,
    fitnessequipment = 363,
    fitnessinstruction = 364,
    fixedbaseoperator = 365,
    flatbread = 366,
    flightinstructionschool = 367,
    floatspa = 368,
    flooringinstallationandrepair = 369,
    floraldesign = 370,
    florist = 371,
    florists = 372,
    flowers = 373,
    fondue = 374,
    foodcourt = 375,
    fooddelivery = 376,
    foodstand = 377,
    foodtruck = 378,
    formalwear = 379,
    "formalwear.rental" = 380,
    freiduria = 381,
    french = 382,
    "french.alsatian" = 383,
    "french.auvergnat" = 384,
    "french.baguette" = 385,
    "french.berrichon" = 386,
    "french.bourguignon" = 387,
    "french.brasserie" = 388,
    "french.lyonnais" = 389,
    "french.nicois" = 390,
    "french.provencal" = 391,
    friterie = 392,
    frozenfoods = 393,
    fruitandvegetables = 394,
    fuelstation = 395,
    funeralservices = 396,
    furclothing = 397,
    furniture = 398,
    "furniture.rental" = 399,
    furniturestore = 400,
    gardening = 401,
    gastroenterology = 402,
    gastropubs = 403,
    gelato = 404,
    georgian = 405,
    german = 406,
    "german.baden" = 407,
    "german.bavarian" = 408,
    "german.currysausage" = 409,
    "german.easterngerman" = 410,
    "german.fischbroetchen" = 411,
    "german.franconian" = 412,
    "german.hessian" = 413,
    "german.heuriger" = 414,
    "german.northerngerman" = 415,
    "german.palatine" = 416,
    "german.rhinelandian" = 417,
    "german.swabian" = 418,
    "giblets" = 419,
    "giftshops" = 420,
    "glutenfree" = 421,
    "gokarting" = 422,
    "goldmerchants" = 423,
    "golf" = 424,
    "golf.instruction" = 425,
    "golfequipment" = 426,
    "golfshop" = 427,
    "gourmetfood" = 428,
    "gourmetmarket" = 429,
    "graphicaldesign" = 430,
    "greek" = 431,
    "grillingequipment" = 432,
    "grocery" = 433,
    "grocery.asian" = 434,
    "grocery.chinese" = 435,
    "grocery.indian" = 436,
    "grocery.japanese" = 437,
    "grocery.korean" = 438,
    "grocery.persian" = 439,
    "grocerystore" = 440,
    "guitarstore" = 441,
    "gunrange" = 442,
    "gunsandammo" = 443,
    "gym" = 444,
    "gymnastics" = 445,
    "hairblowout" = 446,
    "haircutsstyling" = 447,
    "haircutsstyling.mens" = 448,
    "hairextensions" = 449,
    "hairloss" = 450,
    "hairremoval" = 451,
    "hairremoval.laser" = 452,
    "hairremoval.threading" = 453,
    "hairremoval.waxing" = 454,
    "hairstylist" = 455,
    "haitian" = 456,
    "halal" = 457,
    "hardware" = 458,
    "hats" = 459,
    "hauntedhouse" = 460,
    "hawaiian" = 461,
    "headshop" = 462,
    "healthcare" = 463,
    "healthcarecenter" = 464,
    "healthyfoods" = 465,
    "hearingaidproviders" = 466,
    "hearingaids" = 467,
    "hennaartist" = 468,
    "herbalmedicine" = 469,
    "herbsandspices" = 470,
    "highschool" = 471,
    "himalayan" = 472,
    "hobbyshop" = 473,
    "holidaydecorations" = 474,
    "homeandgarden" = 475,
    "homeappliancerepair" = 476,
    "homeautomation" = 477,
    "homecleaning" = 478,
    "homedecor" = 479,
    "homedevelopers" = 480,
    "homegarden" = 481,
    "homehealthcare" = 482,
    "homeopathy" = 483,
    "hometheaterinstallation" = 484,
    "honey" = 485,
    "hongkong.cafe" = 486,
    "hookahbar" = 487,
    "horsequipment" = 488,
    "hospital" = 489,
    "hostel" = 490,
    "hotdogs" = 491,
    "hotel" = 492,
    "hotel.business" = 493,
    "hotel.capsule" = 494,
    "hotelbar" = 495,
    "hotpot" = 496,
    "hottubandpool" = 497,
    "housingcooperative" = 498,
    "hungarian" = 499,
    "huntingfishingsupplies" = 500,
    "hvac" = 501,
    "hypermarket" = 502,
    "iberian" = 503,
    "icecream" = 504,
    "importedfood" = 505,
    "indian" = 506,
    "indian.andhra" = 507,
    "indian.assamese" = 508,
    "indian.awadhi" = 509,
    "indian.bihari" = 510,
    "indian.chettinad" = 511,
    "indian.goan" = 512,
    "indian.gujarat" = 513,
    "indian.hyderabadi" = 514,
    "indian.kerala" = 515,
    "indian.konkan" = 516,
    "indian.lucknowi" = 517,
    "indian.maharashtrian" = 518,
    "indian.malwani" = 519,
    "indian.mangalorean" = 520,
    "indian.northindian" = 521,
    "indian.oriya" = 522,
    "indian.rajasthani" = 523,
    "indian.southindian" = 524,
    "indonesian" = 525,
    "informationtechnology" = 526,
    "installmentloanservices" = 527,
    "insulationinstallation" = 528,
    "insurance" = 529,
    "insurance.auto" = 530,
    "insurance.health" = 531,
    "insurance.home" = 532,
    "insurance.life" = 533,
    "interiordesign" = 534,
    "internalmedicine" = 535,
    "internationalfood" = 536,
    "internetbooth" = 537,
    "internetcafe" = 538,
    "internetserviceprovider" = 539,
    "investmentbanking" = 540,
    "irish" = 541,
    "irishpub" = 542,
    "israeli" = 543,
    "italian" = 544,
    "italian.abruzzese" = 545,
    "italian.altoatesine" = 546,
    "italian.apulian" = 547,
    "italian.calabrian" = 548,
    "italian.cucinacampana" = 549,
    "italian.diner" = 550,
    "italian.emilian" = 551,
    "italian.friulan" = 552,
    "italian.lumbard" = 553,
    "italian.napoletana" = 554,
    "italian.norcinerie" = 555,
    "italian.piedmont" = 556,
    "italian.roman" = 557,
    "italian.sardinian" = 558,
    "italian.sicilian" = 559,
    "italian.tuscan" = 560,
    "italian.venetian" = 561,
    "ivhydration" = 562,
    "izakaya" = 563,
    "japanese" = 564,
    "japanese.bento" = 565,
    "japanese.blowfish" = 566,
    "japanese.curry" = 567,
    "japanese.donburi" = 568,
    "japanese.gyudon" = 569,
    "japanese.handrolls" = 570,
    "japanese.horumon" = 571,
    "japanese.kushikatsu" = 572,
    "japanese.nikkei" = 573,
    "japanese.oden" = 574,
    "japanese.okonomiyaki" = 575,
    "japanese.onigiri" = 576,
    "japanese.oyakodon" = 577,
    "japanese.ramen" = 578,
    "japanese.shabushabu" = 579,
    "japanese.soba" = 580,
    "japanese.sukiyaki" = 581,
    "japanese.takoyaki" = 582,
    "japanese.tempura" = 583,
    "japanese.teppanyaki" = 584,
    "japanese.tonkatsu" = 585,
    "japanese.udon" = 586,
    "japanese.unagi" = 587,
    "japanese.westernjapanese" = 588,
    "japanese.yakiniku" = 589,
    "japanese.yakitori" = 590,
    "japanesesweets" = 591,
    "jewelry" = 592,
    "jewelryrepair" = 593,
    "jewish" = 594,
    "juicebar" = 595,
    "kaiseki" = 596,
    "karaoke" = 597,
    "kashmiri" = 598,
    "kebab" = 599,
    "kidsactivities" = 600,
    "kimonos" = 601,
    "kindergarten" = 602,
    "kiosk" = 603,
    "kiosk.food" = 604,
    "kitchenandbath" = 605,
    "kitchenincubator" = 606,
    "knifesharpening" = 607,
    "knittingsupplies" = 608,
    "kopitiam" = 609,
    "korean" = 610,
    "kosher" = 611,
    "kurdish" = 612,
    "laboratorytesting" = 613,
    "landmark" = 614,
    "landscaping" = 615,
    "languageschool" = 616,
    "laotian" = 617,
    "lasereyesurgery" = 618,
    "lasertag" = 619,
    "latinamerican" = 620,
    "laundromat" = 621,
    "laundryservices" = 622,
    "lawyer" = 623,
    "lawyer.business" = 624,
    "lawyer.criminaldefense" = 625,
    "lawyer.divorce" = 626,
    "lawyer.estateplanning" = 627,
    "lawyer.immigration" = 628,
    "lawyer.litigation" = 629,
    "lawyer.personalinjury" = 630,
    "lawyer.realestate" = 631,
    "lawyer.tax" = 632,
    "lawyer.willtrustprobate" = 633,
    "lawyer.workerscomp" = 634,
    "leathergoods" = 635,
    "lebanese" = 636,
    "legalservices" = 637,
    "library" = 638,
    "lifecoach" = 639,
    "lighting" = 640,
    "ligurian" = 641,
    "limo" = 642,
    "linens" = 643,
    "lingerie" = 644,
    "livestocksales" = 645,
    "localservices" = 646,
    "locksmith" = 647,
    "lotterystand" = 648,
    "loungebar" = 649,
    "luggage" = 650,
    "luggagestorage" = 651,
    "macaron" = 652,
    "magicians" = 653,
    "mailboxcenter" = 654,
    "makeupartist" = 655,
    "malaysian" = 656,
    "mamak" = 657,
    "manicurists" = 658,
    "marketing" = 659,
    "martialarts" = 660,
    "massageschool" = 661,
    "massagetherapist" = 662,
    "massagetherapy" = 663,
    "maternitywear" = 664,
    "mattresses" = 665,
    "mauritian" = 666,
    "meatballs" = 667,
    "medicalcenter" = 668,
    "medicalspa" = 669,
    "medicalsupplies" = 670,
    "mediterranean" = 671,
    "mexican" = 672,
    "mexican.easternmexican" = 673,
    "mexican.jaliscan" = 674,
    "mexican.modern" = 675,
    "mexican.northernmexican" = 676,
    "mexican.oaxacan" = 677,
    "mexican.pueblan" = 678,
    "mexican.yucatan" = 679,
    "middleeastern" = 680,
    "militarybase" = 681,
    "milkbar" = 682,
    "milkshakes" = 683,
    "minigolf" = 684,
    "mobilephonerepair" = 685,
    "mobilephones" = 686,
    "moneytransferservices" = 687,
    "mongolian" = 688,
    "moroccan" = 689,
    "mortgagebroker" = 690,
    "motorcyclingclothing" = 691,
    "movierental.kiosk" = 692,
    "mughlai" = 693,
    "museum.art" = 694,
    "museum.children" = 695,
    "museum.history" = 696,
    "musicalinstruments" = 697,
    "musicalinstrumentservices" = 698,
    "musicvenue" = 699,
    "musicvideo" = 700,
    "naga" = 701,
    "nasilemak" = 702,
    "naturopathy" = 703,
    "nepalese" = 704,
    "newspapersandmagazines" = 705,
    "newzealand" = 706,
    "nicaraguan" = 707,
    "nightfood" = 708,
    "nonprofit" = 709,
    "noodles" = 710,
    "northamerican.traditional" = 711,
    "norwegian" = 712,
    "notarypublic" = 713,
    "nurseries.gardening" = 714,
    "nyonya" = 715,
    "obgyn" = 716,
    "observatory" = 717,
    "occupationaltherapy" = 718,
    "officebuilding" = 719,
    "officeequipmentandsupplies" = 720,
    "okinawan" = 721,
    "oliveoil" = 722,
    "opensandwiches" = 723,
    "opera.ballet" = 724,
    "opthamalogy" = 725,
    "opticians" = 726,
    "optometry" = 727,
    "oralsurgery" = 728,
    "organicfood" = 729,
    "oriental" = 730,
    "orthodontics" = 731,
    "orthopedics" = 732,
    "orthotics" = 733,
    "osteopathy" = 734,
    "ottoman" = 735,
    "outdoorfurniture" = 736,
    "outdoorgear" = 737,
    "outletmall" = 738,
    "outletstore" = 739,
    "oxygenbar" = 740,
    "pachinko" = 741,
    "packagelocker" = 742,
    "packing" = 743,
    "packingsupplies" = 744,
    "paella" = 745,
    "painmanagement" = 746,
    "paintandsip" = 747,
    "painting" = 748,
    "paintstores" = 749,
    "paintyourownpottery" = 750,
    "pakistani" = 751,
    "parentingschool" = 752,
    "parking" = 753,
    "parks" = 754,
    "parma" = 755,
    "parsi" = 756,
    "partycharacters" = 757,
    "partyequipment.rental" = 758,
    "partysupplies" = 759,
    "passportvisaservices" = 760,
    "pasta" = 761,
    "pathology" = 762,
    "pawn" = 763,
    "paydayloan" = 764,
    "pediatrics" = 765,
    "performingarts" = 766,
    "perfume" = 767,
    "periodontics" = 768,
    "permanentmakeup" = 769,
    "persian" = 770,
    "personalcare" = 771,
    "personalshopper" = 772,
    "personaltrainer" = 773,
    "peruvian" = 774,
    "pets" = 775,
    "pets.adoption" = 776,
    "pets.boarding" = 777,
    "pets.grooming" = 778,
    "pets.photography" = 779,
    "pets.sitting" = 780,
    "pets.training" = 781,
    "pets.transportation" = 782,
    "petstore" = 783,
    "petstore.fish" = 784,
    "petstore.reptile" = 785,
    "pharmacy" = 786,
    "pharmacystore" = 787,
    "phonechargingstation" = 788,
    "photobooth.rental" = 789,
    "photography" = 790,
    "photography.event" = 791,
    "photography.session" = 792,
    "photographyequipment" = 793,
    "photographystore" = 794,
    "physicaltherapy" = 795,
    "physician" = 796,
    "piadina" = 797,
    "pianobar" = 798,
    "pianostore" = 799,
    "pictureframing" = 800,
    "pilates" = 801,
    "pita" = 802,
    "pizza" = 803,
    "placeofworship" = 804,
    "placeofworship.church" = 805,
    "placeofworship.mosque" = 806,
    "placeofworship.synagogue" = 807,
    "placeofworship.unitarian" = 808,
    "planetarium" = 809,
    "plasticsurgery" = 810,
    "playcenter" = 811,
    "playground" = 812,
    "playsets" = 813,
    "plaza" = 814,
    "podiatrists" = 815,
    "podiatry" = 816,
    "poke" = 817,
    "poledancingschool" = 818,
    "policestation" = 819,
    "policestation.koban" = 820,
    "polish" = 821,
    "polish.pierogis" = 822,
    "poolcleaning" = 823,
    "poolhall" = 824,
    "pooltablesupplies" = 825,
    "popcorn" = 826,
    "popup" = 827,
    "popupshops" = 828,
    "portuguese" = 829,
    "portuguese.alentejo" = 830,
    "portuguese.algarve" = 831,
    "portuguese.azores" = 832,
    "portuguese.beira" = 833,
    "portuguese.fadohouse" = 834,
    "portuguese.madeira" = 835,
    "portuguese.minho" = 836,
    "portuguese.ribatejo" = 837,
    "portuguese.trasosmontes" = 838,
    "postoffice" = 839,
    "postoffice.authorizedagent" = 840,
    "potatoes" = 841,
    "poutineries" = 842,
    "prenatal" = 843,
    "preschool" = 844,
    "pretzels" = 845,
    "preventivemedicine" = 846,
    "printmedia" = 847,
    "privateinvestigation" = 848,
    "privatejetcharter" = 849,
    "privateschool" = 850,
    "privateshuttlebus" = 851,
    "professionalservices" = 852,
    "professionalsportsteam" = 853,
    "propertymanagement" = 854,
    "psychiatrists" = 855,
    "psychiatry" = 856,
    "psychic" = 857,
    "psychology" = 858,
    "pub" = 859,
    "publicart" = 860,
    "publiclibrary" = 861,
    "publicservices.government" = 862,
    "publictransport" = 863,
    "puertorican" = 864,
    "pulmonology" = 865,
    "punjabi" = 866,
    "racetrack" = 867,
    "radiology" = 868,
    "radiostation" = 869,
    "rawfood" = 870,
    "realestate.agents" = 871,
    "realestate.services" = 872,
    "realestateagents" = 873,
    "realestateagents.commercial" = 874,
    "realestateservices" = 875,
    "recordingstudio" = 876,
    "recreation" = 877,
    "recreationcenter" = 878,
    "recyclingcenter" = 879,
    "reflexology" = 880,
    "religiousitems" = 881,
    "rental.videoandgame" = 882,
    "researchanddevelopment" = 883,
    "residentialapartments" = 884,
    "restaurant" = 885,
    "retirementhome" = 886,
    "reunionnese" = 887,
    "reupholstery" = 888,
    "riceshop" = 889,
    "rideshare" = 890,
    "robatayaki" = 891,
    "rockclimbing" = 892,
    "rodizio" = 893,
    "romanian" = 894,
    "roofing" = 895,
    "rotisseriechicken" = 896,
    "rugs" = 897,
    "russian" = 898,
    "sakebar" = 899,
    "salad" = 900,
    "salvadoran" = 901,
    "sandwiches" = 902,
    "sauna" = 903,
    "scandinavian" = 904,
    "scandinaviandesign" = 905,
    "school" = 906,
    "scottish" = 907,
    "screenprinting" = 908,
    "screenprinting.tshirt" = 909,
    "seafood" = 910,
    "seafoodmarket" = 911,
    "securitysystems" = 912,
    "selfstorage" = 913,
    "senegalese" = 914,
    "seniorcenter" = 915,
    "serbianandcroatian" = 916,
    "sewingalterations" = 917,
    "sharedofficespace" = 918,
    "shavedice" = 919,
    "shavedsnow" = 920,
    "shippingcenters" = 921,
    "shippingdropbox" = 922,
    "shoerepair" = 923,
    "shoes" = 924,
    "shoeshine" = 925,
    "shoestore" = 926,
    "shopping" = 927,
    "shoppingpassage" = 928,
    "shutterinstallation" = 929,
    "signature" = 930,
    "signmaking" = 931,
    "silentdisco" = 932,
    "singaporean" = 933,
    "skatepark" = 934,
    "skatingequipment" = 935,
    "skatingrink" = 936,
    "skiequipment" = 937,
    "skincare" = 938,
    "skydiving" = 939,
    "sleepwear" = 940,
    "slovakian" = 941,
    "soccer" = 942,
    "socialclub" = 943,
    "socialservices" = 944,
    "softwaredevelopment" = 945,
    "solarinstallation" = 946,
    "sommeliers" = 947,
    "soulfood" = 948,
    "soup" = 949,
    "southafrican" = 950,
    "southernunitedstates" = 951,
    "southwestunitedstates" = 952,
    "souvenirs" = 953,
    "spanish" = 954,
    "spanish.andalusian" = 955,
    "spanish.basque" = 956,
    "spanish.catalan" = 957,
    "spanish.galician" = 958,
    "specialtyfood" = 959,
    "specialtyschool" = 960,
    "spinclass" = 961,
    "spiritualproducts" = 962,
    "sportinggoods" = 963,
    "sportsbar" = 964,
    "sportsclub" = 965,
    "sportsequipment.rental" = 966,
    "sportsgoods" = 967,
    "sportsmedicine" = 968,
    "sportsschool" = 969,
    "sportswear" = 970,
    "srilankan" = 971,
    "stationery" = 972,
    "steak" = 973,
    "stockings" = 974,
    "streetvendor" = 975,
    "structuralengineers" = 976,
    "subwaystation" = 977,
    "supermarket" = 978,
    "supperclub" = 979,
    "surfacerefinishing" = 980,
    "surfing" = 981,
    "surfingequipment" = 982,
    "surgeon" = 983,
    "sushi" = 984,
    "swedish" = 985,
    "swedish.traditional" = 986,
    "swimminginstruction" = 987,
    "swimmingpool" = 988,
    "swimwear" = 989,
    "swiss" = 990,
    "syrian" = 991,
    "taberna" = 992,
    "tabletopgames" = 993,
    "tableware" = 994,
    "tacos" = 995,
    "taiwanese" = 996,
    "taiyaki" = 997,
    "talentagencies" = 998,
    "tamales" = 999,
    "tanningbeds" = 1000,
    "tanningservices" = 1001,
    "tapas" = 1002,
    "tapas.smallplate" = 1003,
    "tattoo" = 1004,
    "tattoo.removal" = 1005,
    "taxi" = 1006,
    "taxistand" = 1007,
    "taxoffice" = 1008,
    "taxservices" = 1009,
    "tea" = 1010,
    "teachersupplies" = 1011,
    "teambuilding" = 1012,
    "teethwhitening" = 1013,
    "telecommunications" = 1014,
    "televisionserviceproviders" = 1015,
    "televisionstation" = 1016,
    "tennis.instruction" = 1017,
    "terminal" = 1018,
    "terminal.bus" = 1019,
    "testpreparationschool" = 1020,
    "texmex" = 1021,
    "thai" = 1022,
    "theater.drivein" = 1023,
    "theater.movie" = 1024,
    "themedcafe" = 1025,
    "thriftstore" = 1026,
    "tibetan" = 1027,
    "tickets" = 1028,
    "tikibar" = 1029,
    "titleloan" = 1030,
    "tobaccoshop" = 1031,
    "tofu" = 1032,
    "touristattraction" = 1033,
    "tours" = 1034,
    "tours.boat" = 1035,
    "tours.bus" = 1036,
    "tours.scooter" = 1037,
    "tours.walking" = 1038,
    "towncarservice" = 1039,
    "toys" = 1040,
    "toystore" = 1041,
    "traditionalchinesemedicine" = 1042,
    "trainserviceprovider" = 1043,
    "trainstation" = 1044,
    "trampolining" = 1045,
    "transitlounge" = 1046,
    "translationservices" = 1047,
    "transportationservices" = 1048,
    "trattoria" = 1049,
    "travelagent" = 1050,
    "travelservices" = 1051,
    "trinidadian" = 1052,
    "trophyshops" = 1053,
    "truckrental" = 1054,
    "tuina" = 1055,
    "turkish" = 1056,
    "turkish.cheekufta" = 1057,
    "turkish.gozleme" = 1058,
    "turkish.homemadefood" = 1059,
    "turkish.lahmacun" = 1060,
    "turkish.ravioli" = 1061,
    "tutoring" = 1062,
    "ukrainian" = 1063,
    "uniforms" = 1064,
    "urgentcare" = 1065,
    "usedbooks" = 1066,
    "utilities" = 1067,
    "uzbek" = 1068,
    "vacationhome" = 1069,
    "vacationhome.agent" = 1070,
    "valetservices" = 1071,
    "vapeshops" = 1072,
    "vascularmedicine" = 1073,
    "vegan" = 1074,
    "vegetarian" = 1075,
    "vendingmachine" = 1076,
    "vendingmachine.beverage" = 1077,
    "venezuelan" = 1078,
    "venison" = 1079,
    "veteransorganization" = 1080,
    "veterinarian" = 1081,
    "videofilmproduction" = 1082,
    "videogamesandconsoles" = 1083,
    "vietnamese" = 1084,
    "vintageclothing" = 1085,
    "vinylrecords" = 1086,
    "virtualreality" = 1087,
    "visitorcenter" = 1088,
    "vitaminssupplements" = 1089,
    "vocalcoach" = 1090,
    "vocationalschool" = 1091,
    "waffles" = 1092,
    "walkinclinic" = 1093,
    "warehouse" = 1094,
    "watches" = 1095,
    "watchrepair" = 1096,
    "waterpark" = 1097,
    "waterpurification" = 1098,
    "webdesign" = 1099,
    "weddingchappel" = 1100,
    "weddingplanning" = 1101,
    "weightloss" = 1102,
    "welsh" = 1103,
    "whiskeybar" = 1104,
    "wholesalemerchant" = 1105,
    "wholesaler" = 1106,
    "wigs" = 1107,
    "windowinstallation" = 1108,
    "winebar" = 1109,
    "winery" = 1110,
    "winetasting" = 1111,
    "wok" = 1112,
    "wraps" = 1113,
    "yoga" = 1114,
    "youthclub" = 1115,
    "yugoslav" = 1116
}
/**
 * Opening categories
 * https://docs.ogc.org/cs/20-094/Categories/index.html#opening
 */
export declare enum OPENING_CATEGORY {
    "automobile" = "automobile",
    "bicycle" = "bicycle",
    "emergencyexit" = "emergencyexit",
    "pedestrian" = "pedestrian",
    "pedestrian.principal" = "pedestrian.principal",
    "pedestrian.transit" = "pedestrian.transit",
    "service" = "service"
}
/**
 * Relationship categories
 * https://docs.ogc.org/cs/20-094/Categories/index.html#relationship
 */
export declare enum RELATIONSHIP_CATEGORY {
    "elevator" = "elevator",
    "escalator" = "escalator",
    "movingwalkway" = "movingwalkway",
    "ramp" = "ramp",
    "stairs" = "stairs",
    "traversal" = "traversal",
    "traversal.path" = "traversal.path"
}
/**
 * Restricition categories
 * https://docs.ogc.org/cs/20-094/Categories/index.html#restriction
 */
export declare enum RESTRICTION_CATEGORY {
    employeesonly = "employeesonly",
    restricted = "restricted"
}
export declare enum SECTION_CATEGORY {
    arcade = "arcade",
    baggageclaim = "baggageclaim",
    "baggageclaim.intl" = "baggageclaim.intl",
    carrental = "carrental",
    "carrental.dropoff" = "carrental.dropoff",
    checkin = "checkin",
    concessions = "concessions",
    cubicle = "cubicle",
    dutyfree = "dutyfree",
    eatingdrinking = "eatingdrinking",
    entertainmentarea = "entertainmentarea",
    "entertainmentarea.game" = "entertainmentarea.game",
    "entertainmentarea.music" = "entertainmentarea.music",
    "entertainmentarea.performance" = "entertainmentarea.performance",
    "entertainmentarea.sport" = "entertainmentarea.sport",
    exhibit = "exhibit",
    exhibition = "exhibition",
    gambling = "gambling",
    "gambling.baccarat" = "gambling.baccarat",
    "gambling.bingo" = "gambling.bingo",
    "gambling.blackjack" = "gambling.blackjack",
    "gambling.craps" = "gambling.craps",
    "gambling.keno" = "gambling.keno",
    "gambling.mahjong" = "gambling.mahjong",
    "gambling.medalgame" = "gambling.medalgame",
    "gambling.minibaccarat" = "gambling.minibaccarat",
    "gambling.offtrackbetting" = "gambling.offtrackbetting",
    "gambling.pachinko" = "gambling.pachinko",
    "gambling.paigow" = "gambling.paigow",
    "gambling.poker" = "gambling.poker",
    "gambling.poker.letitride" = "gambling.poker.letitride",
    "gambling.poker.paigow" = "gambling.poker.paigow",
    "gambling.poker.threecard" = "gambling.poker.threecard",
    "gambling.poker.video" = "gambling.poker.video",
    "gambling.roulette" = "gambling.roulette",
    "gambling.rummy" = "gambling.rummy",
    "gambling.sicbo" = "gambling.sicbo",
    "gambling.slotmachine" = "gambling.slotmachine",
    "gambling.slotmachine.highlimit" = "gambling.slotmachine.highlimit",
    gatearea = "gatearea",
    "gatearea.holding" = "gatearea.holding",
    immigration = "immigration",
    "immigration.schengen" = "immigration.schengen",
    information = "information",
    paidarea = "paidarea",
    parkandride = "parkandride",
    parking = "parking",
    "parking.bicycle" = "parking.bicycle",
    "parking.compact" = "parking.compact",
    "parking.ev" = "parking.ev",
    "parking.longterm" = "parking.longterm",
    "parking.motorcycle" = "parking.motorcycle",
    "parking.shortterm" = "parking.shortterm",
    "parking.waitingarea" = "parking.waitingarea",
    platform = "platform",
    postsecurity = "postsecurity",
    presecurity = "presecurity",
    private = "private",
    recomposearea = "recomposearea",
    recreation = "recreation",
    rental = "rental",
    retail = "retail",
    retaildepartment = "retaildepartment",
    road = "road",
    seating = "seating",
    seatingrow = "seatingrow",
    security = "security",
    servicearea = "servicearea",
    ticketing = "ticketing",
    vegetation = "vegetation",
    walkway = "walkway"
}
/**
 * Unit categories
 * https://docs.ogc.org/cs/20-094/Categories/index.html#unit
 */
export declare enum UNIT_CATEGORY {
    auditorium = "auditorium",
    brick = "brick",
    classroom = "classroom",
    column = "column",
    concrete = "concrete",
    conferenceroom = "conferenceroom",
    drywall = "drywall",
    elevator = "elevator",
    escalator = "escalator",
    fieldofplay = "fieldofplay",
    firstaid = "firstaid",
    fitnessroom = "fitnessroom",
    foodservice = "foodservice",
    footbridge = "footbridge",
    glass = "glass",
    huddleroom = "huddleroom",
    kitchen = "kitchen",
    laboratory = "laboratory",
    library = "library",
    lobby = "lobby",
    lounge = "lounge",
    mailroom = "mailroom",
    mothersroom = "mothersroom",
    movietheater = "movietheater",
    movingwalkway = "movingwalkway",
    nonpublic = "nonpublic",
    office = "office",
    opentobelow = "opentobelow",
    parking = "parking",
    phoneroom = "phoneroom",
    platform = "platform",
    privatelounge = "privatelounge",
    ramp = "ramp",
    recreation = "recreation",
    restroom = "restroom",
    "restroom.family" = "restroom.family",
    "restroom.female" = "restroom.female",
    "restroom.female.wheelchair" = "restroom.female.wheelchair",
    "restroom.male" = "restroom.male",
    "restroom.male.wheelchair" = "restroom.male.wheelchair",
    "restroom.transgender" = "restroom.transgender",
    "restroom.transgender.wheelchair" = "restroom.transgender.wheelchair",
    "restroom.unisex" = "restroom.unisex",
    "restroom.unisex.wheelchair" = "restroom.unisex.wheelchair",
    "restroom.wheelchair" = "restroom.wheelchair",
    road = "road",
    room = "room",
    serverroom = "serverroom",
    shower = "shower",
    smokingarea = "smokingarea",
    stairs = "stairs",
    steps = "steps",
    storage = "storage",
    structure = "structure",
    terrace = "terrace",
    theater = "theater",
    unenclosedarea = "unenclosedarea",
    unspecified = "unspecified",
    vegetation = "vegetation",
    waitingroom = "waitingroom",
    walkway = "walkway",
    "walkway.island" = "walkway.island",
    wood = "wood"
}
/**
 * Venue categories
 * https://docs.ogc.org/cs/20-094/Categories/index.html#venue
 */
export declare enum VENUE_CATEGORY {
    airport = "airport",
    "airport.intl" = "airport.intl",
    aquarium = "aquarium",
    businesscampus = "businesscampus",
    casino = "casino",
    communitycenter = "communitycenter",
    conventioncenter = "conventioncenter",
    governmentfacility = "governmentfacility",
    healthcarefacility = "healthcarefacility",
    hotel = "hotel",
    museum = "museum",
    parkingfacility = "parkingfacility",
    resort = "resort",
    retailstore = "retailstore",
    shoppingcenter = "shoppingcenter",
    stadium = "stadium",
    stripmall = "stripmall",
    theater = "theater",
    themepark = "themepark",
    trainstation = "trainstation",
    transitstation = "transitstation",
    university = "university"
}
export {};
