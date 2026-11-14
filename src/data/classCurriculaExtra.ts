/**
 * EduPlan NG - Additional Official NERDC Statutory Curricula
 * Class & Term Isolation Matrix for Specialized Subjects:
 * - Agricultural Science (JSS 1–3, SSS 1–3)
 * - Basic Technology (JSS 1–3)
 * - Business Studies (JSS 1–3) & Commerce / Accounting (SSS 1–3)
 * - Computer Studies & Data Processing (JSS 1–3, SSS 1–3)
 * - Government & Politics (SSS 1–3)
 * - Literature-in-English (SSS 1–3)
 * - Geography (SSS 1–3)
 * - Further Mathematics (SSS 1–3)
 * - Physical & Health Education (PHE) (JSS 1–3)
 * - Cultural & Creative Arts (CCA) (JSS 1–3)
 * - Christian Religious Studies (CRS) / IRS (JSS 1–3, SSS 1–3)
 * - Home Economics & Food/Nutrition (JSS 1–3, SSS 1–3)
 */

import type { LevelCurriculumMap } from './classCurricula.ts';

// ---------------------------------------------------------------------------
// 1. AGRICULTURAL SCIENCE
// ---------------------------------------------------------------------------
export const AGRICULTURAL_SCIENCE_CURRICULUM: LevelCurriculumMap = {
  'jss-1': {
    1: [
      'Meaning, Scope, and Importance of Agriculture in Nigerian Economy',
      'Historical Evolution of Agriculture: Hunting, Gathering to Modern Mechanization',
      'Types of Agricultural Practices: Subsistence vs Commercial Farming',
      'Classification of Agricultural Crops Based on Life Cycle (Annuals, Biennials, Perennials)',
      'Classification of Crops Based on Uses (Cereals, Legumes, Tubers, Vegetables, Fruits)',
      'Forms of Farm Animals: Ruminants, Non-Ruminants, Aquatic Animals, and Poultry',
      'Distribution of Crops and Farm Animals in Different Ecological Zones of Nigeria',
      'Simple Farm Tools: Identification, Uses, and Maintenance of Cutting Tools (Cutlass, Sickle)',
      'Simple Farm Tools: Digging and Carrying Tools (Hoe, Spade, Shovel, Wheelbarrow)',
      'Safety Rules and Storage in Farm Tool Shed and Workshop'
    ],
    2: [
      'Weeds: Definition, Common Nigerian Weed Types, and Identification',
      'Economic Importance of Weeds and Adaptations for Survival and Dispersal',
      'Weed Control Methods: Cultural, Biological, Physical, and Chemical Methods',
      'Pests of Agricultural Crops: Types (Insects, Rodents, Birds) and Characteristics',
      'Classification of Insect Pests by Feeding Habits: Biting/Chewing, Piercing/Sucking, Boring',
      'Economic Losses Caused by Crop Pests in Nigerian Food Security',
      'Methods of Crop Pest Control: Preventive, Mechanical, and Chemical (Pesticides)',
      'Factors of Agricultural Production: Land, Labor, Capital, and Management',
      'Land as a Factor of Production: Characteristics and Ownership Systems in Nigeria',
      'Labor and Capital in Smallholder Farming: Sources, Types, and Utilization'
    ],
    3: [
      'Soil: Definition, Importance to Plants, and Composition of Soil Components',
      'Physical Properties of Soil: Texture, Structure, Porosity, and Temperature',
      'Types of Soil: Sandy, Clayey, and Loamy Soils - Experiments on Water Retention',
      'Soil Fertility: Causes of Soil Nutrient Loss (Leaching, Erosion, Overgrazing, Bush Burning)',
      'Methods of Maintaining Soil Fertility: Organic Manure (Compost, Farmyard Manure, Green Manure)',
      'Inorganic Fertilizers: NPK, Urea, Single Superphosphate - Methods of Application',
      'Forests and Forest Uses: Economic Value of Timber, Resins, Rubber, and Medicinal Herbs',
      'Deforestation in Nigeria: Causes, Environmental Consequences (Desertification, Erosion)',
      'Forest Conservation Methods: Afforestation, Reforestation, and Forest Reserves',
      'Field Trip: School Farm Practical Demonstrations, Bed Preparation, and Seed Sowing'
    ]
  },
  'jss-2': {
    1: [
      'Farm Structures and Buildings: Types (Barns, Silos, Pens, Cribs, Fences) and Siting',
      'Maintenance of Farm Structures: Protection against Termites, Weather, and Decay',
      'Crop Propagation: Sexual Propagation (Seeds) - Advantages and Disadvantages',
      'Asexual (Vegetative) Propagation: Cuttings, Layering, Grafting, and Budding',
      'Cultural Practices for Crop Production: Pre-Planting Operations (Clearing, Stumping, Tilling)',
      'Cultural Practices: Planting Operations (Seed Rate, Spacing, Depth, Viability Tests)',
      'Cultural Practices: Post-Planting Operations (Thinning, Supplying, Mulching, Weeding, Staking)',
      'Harvesting, Processing, and Storage of Cereals (Maize, Rice, Guinea Corn)',
      'Harvesting, Processing, and Storage of Root and Tuber Crops (Cassava, Yam, Sweet Potato)',
      'Farm Accounting: Farm Records, Input-Output Logs, and Farm Diaries'
    ],
    2: [
      'Animal Feeds and Feeding: Classes of Feeds (Roughages, Concentrates, Mineral Supplements)',
      'Nutritional Requirements of Farm Animals: Carbohydrates, Proteins, Minerals, Vitamins, Water',
      'Digestive Systems of Non-Ruminants (Monogastric: Pigs, Poultry) - Structure and Function',
      'Digestive Systems of Ruminants (Polygastric: Cattle, Sheep, Goats) - Rumen, Reticulum, Omasum, Abomasum',
      'Poultry Production: Housing Systems (Free-Range, Semi-Intensive, Battery Cage, Deep Litter)',
      'Poultry Management: Brooding, Rearing of Chicks, Feeding, and Egg Production',
      'Rabbit and Snail Farming (Heliculture): Housing, Feeding, Breeding, and Commercial Advantages',
      'Livestock Diseases: Symptoms, Causes, and Economic Effects (Newcastle, Gumboro, Mastitis)',
      'Prevention and Control of Farm Animal Diseases: Quarantine, Hygiene, and Vaccination Programs',
      'Fish Farming (Aquaculture): Construction and Management of Concrete and Earthen Fish Ponds'
    ],
    3: [
      'Agricultural Marketing: Meaning, Stages, and Marketing Channels in Nigeria',
      'Functions of Agricultural Marketing: Grading, Packaging, Transportation, Storage, and Financing',
      'Agricultural Cooperatives: Types, Objectives, and Benefits to Nigerian Smallholder Farmers',
      'Farm Budgeting: Complete Budget vs Partial Budget for Crop and Livestock Enterprises',
      'Agricultural Extension Services: Role of Extension Agents in Disseminating New Technologies',
      'Government Agricultural Programs in Nigeria (Anchor Borrowers, Fadama, Green Imperative)',
      'Export Crops of Nigeria: Cocoa, Oil Palm, Cashew, Sesame - Economic Foreign Exchange Roles',
      'Post-Harvest Food Losses in Nigeria: Causes and Value Addition Strategies (Agro-Processing)',
      'Agro-Allied Industries: Raw Materials Supplied by Farming to National Factories',
      'BECE Practical Mock Farm Examination: Identification of Specimens, Tools, Pests, and Seeds'
    ]
  },
  'jss-3': {
    1: [
      'Agricultural Financing: Capital Requirements, Short-term, Medium-term, and Long-term Loans',
      'Sources of Agricultural Credit: Commercial Banks, Microfinance, BOI, Agricultural Credit Guarantee Scheme',
      'Problems of Agricultural Financing and Collateral Security Challenges for Rural Farmers',
      'Soil Conservation: Water and Wind Erosion - Causes, Mechanics, and Gully Formation in Nigeria',
      'Soil Conservation Techniques: Terracing, Contour Bunding, Strip Cropping, Cover Cropping, Windbreaks',
      'Crop Improvement: Meaning, Aims (High Yield, Pest Resistance, Climate Adaptability)',
      'Methods of Crop Improvement: Introduction, Selection, and Hybridization',
      'Animal Improvement: Aims of Animal Breeding and Selection Criteria in Nigerian Breeds',
      'Methods of Animal Improvement: Inbreeding, Outbreeding, Crossbreeding, and Artificial Insemination',
      'Record Keeping in Commercial Farm Enterprises: Profit and Loss Accounts, Balance Sheet'
    ],
    2: [
      'Pest and Disease Management in Stored Grains: Weevils, Grain Beetles - Fumigation and Hermetic Storage',
      'Nigerian Agro-Ecological Zones and Farming Systems (Mangrove, Rainforest, Guinea/Sudan/Sahel Savannah)',
      'Irrigation Systems: Meaning, Importance, and Types (Surface/Furrow, Sprinkler, Drip Irrigation)',
      'Drainage Systems: Surface Drains, Sub-surface Drains, and Benefits to Waterlogged Farmlands',
      'Beekeeping (Apiculture): Equipment (Modern Langstroth Hives, Smokers), Honey Harvesting, and Economic Value',
      'Pasture and Forage Crops: Types of Pastures (Natural Rangeland, Established Pasture) and Management',
      'Common Grasses and Legumes in Nigerian Rangelands (Elephant Grass, Guinea Grass, Stylosanthes, Centrosema)',
      'Grazing Systems: Rotational Grazing, Continuous Grazing, Zero-Grazing (Soiling), Paddock Fencing',
      'Silage and Hay Preparation: Preservation of Excess Forage for Dry Season Ruminant Nutrition',
      'BECE Diagnostic Paper 1 & 2 Drills: Objective Mastery and Structural Farm Drawing Interpretations'
    ],
    3: [
      'Intensive BECE Agriculture Theory Revision: Crop Production, Agronomy, and Yield Parameters',
      'Intensive BECE Agriculture Theory Revision: Animal Husbandry, Ruminant Anatomy, and Disease Vectors',
      'Intensive BECE Agriculture Theory Revision: Soil Science, Soil Chemistry, and Fertilizer Calculations',
      'BECE Agricultural Economics and Extension Revision: Marketing Margins and Cooperatives',
      'Practical Specimen Identification Clinic: Hand Tools, Modern Machinery Parts, and Soil Test Kits',
      'Practical Specimen Identification Clinic: Common Weeds, Crop Pests, Parasites (Ticks, Lice, Worms)',
      'Practical Specimen Identification Clinic: Rock Minerals, Fertilizers, and Animal Feed Ingredients',
      'Mock Practical Examination: Simulated BECE Lab and Field Specimen Station Assessment',
      'Timed Objective Speed Drills: 60 BECE Standard Multiple Choice Questions with Explanations',
      'Final National and State BECE Examination Preparation and Readiness Review'
    ]
  },
  'sss-1': {
    1: [
      'Meaning, Scope, and Importance of Agriculture: Food, Feed, Fiber, Raw Materials, Employment, FX',
      'Problems of Agricultural Development in Nigeria and West Africa and Realistic Strategic Solutions',
      'Land Tenure Systems in Nigeria: Communal, Inherited, Leasehold, Freehold, Land Use Act of 1978',
      'Agricultural Laws and Reforms: Land Use Act Provisions, Advantages, and Criticisms',
      'Government Agricultural Programs: NALDA, River Basin Development Authorities, Green Imperative',
      'Roles of Non-Governmental Organizations (NGOs) and Research Institutes (IITA, CRIN, NCRI, NIHORT, NVRI)',
      'Environmental Factors Affecting Agricultural Production: Climatic Factors (Rainfall, Temperature, Light, Wind)',
      'Biotic Factors Affecting Crops and Farm Animals: Predators, Parasites, Pathogens, Pollinators, Soil Microbes',
      'Edaphic Factors: Soil pH, Texture, Organic Matter, and Mineral Nutrients',
      'Rock Formation and Weathering: Igneous, Sedimentary, Metamorphic Rocks - Mechanical, Chemical, Biological Weathering'
    ],
    2: [
      'Soil Profile: Horizons (A, B, C, D/R Bedrock) - Characteristics and Agricultural Significance',
      'Soil Composition: Mineral Matter, Organic Matter, Soil Water, Soil Air, Living Organisms',
      'Soil Water: Gravitational Water, Capillary Water, Hygroscopic Water - Determination of Soil Moisture Content',
      'Soil Structure, Porosity, and Aeration: Importance to Root Respiration and Crop Vigor',
      'Soil Fertility and Nutrient Cycles: Carbon Cycle - Stages, Photosynthesis, Respiration, Decomposition',
      'The Nitrogen Cycle: Fixation (Symbiotic & Non-symbiotic), Nitrification, Denitrification, Ammonification',
      'Plant Nutrients: Macro-nutrients (N, P, K, Ca, Mg, S) and Micro-nutrients (Fe, Zn, Cu, B, Mo, Mn)',
      'Deficiency Symptoms of Essential Plant Nutrients: Chlorosis, Stunting, Purpling, Blossom-end Rot',
      'Organic Manures: Compost Making (Heap and Pit Methods), Green Manuring, Slurry Application',
      'Inorganic Fertilizers: Classification, Formulations (NPK Ratios), and Methods of Application'
    ],
    3: [
      'Farm Power: Sources (Human, Animal, Mechanical, Electrical, Solar, Wind) - Advantages and Limitations',
      'Farm Machinery and Implements: Tillage Equipment (Mouldboard Plough, Disc Plough, Disc Harrow, Ridger)',
      'Farm Machinery: Planters, Seed Drills, Boom Sprayers, Harvesters, and Threshers',
      'The Farm Tractor: Major Components, Operating Principles, Daily Routine Maintenance, and Safety',
      'Husbandry of Selected Cereal Crops: Maize (Zea mays) - Land Prep, Sowing, Weed/Pest Management, Harvesting',
      'Husbandry of Selected Legume Crops: Cowpea (Vigna unguiculata) - Inoculation, Pod Borer Control, Storage',
      'Husbandry of Root and Tuber Crops: Cassava (Manihot esculenta) - Stem Cuttings, Mosaic Disease, Processing',
      'Husbandry of Oil/Cash Crops: Oil Palm (Elaeis guineensis) - Germination, Nursery Management, Field Transplanting',
      'WASSCE Practical Agriculture: Identification of Farm Implements, Tractor Parts, and Soil Test Kits',
      'Termly Practical Portfolio Assessment: Demonstration of Farm Bed Preparation and Seedling Nursery'
    ]
  },
  'sss-2': {
    1: [
      'Crop Improvement: Principles of Genetics, Mendelian Inheritance, Genes, Chromosomes, Genotype and Phenotype',
      'Mendel’s Laws of Segregation and Independent Assortment Applied to Agronomic Traits',
      'Methods of Crop Improvement: Introduction, Selection (Mass, Pure-Line, Pedigree), Hybridization',
      'Breeding for Pest and Disease Resistance, Drought Tolerance, and Nutritional Biofortification',
      'Pasture and Forage Agronomy: Establishment of Improved Pastures, Carrying Capacity, and Stocking Rates',
      'Management of Natural and Artificial Pastures: Burning, Fertilization, Weed Eradication, Rotational Grazing',
      'Forest Management: Silviculture, Selective Felling, Taungya System, Afforestation, and Timber Regulations',
      'Floriculture and Ornamental Plants: Landscaping Principles, Propagation of Hedges, Flowers, and Shade Trees',
      'Agricultural Ecology: Micro-Ecosystems on the Farm, Food Chains, Food Webs, and Energy Flow',
      'Pollution in Agriculture: Agro-Chemical Runoff, Fertilizer Eutrophication, Plastic Mulch Waste, Oil Spills'
    ],
    2: [
      'Anatomy and Physiology of Farm Animals: Digestive Systems of Monogastrics (Pigs, Poultry) vs Ruminants (Cattle, Goats)',
      'Circulatory System of Farm Animals: Heart Structure, Blood Vessels, Blood Composition, and Functions',
      'Respiratory System: Organs of Respiration, Mechanics of Breathing, and Thermoregulation in Tropical Breeds',
      'Reproductive System of Ruminants: Male and Female Reproductive Organs, Spermatogenesis, and Oogenesis',
      'Reproductive Hormones in Farm Animals: Estrogen, Progesterone, Testosterone, Oxytocin, Relaxin, FSH, LH',
      'The Estrous Cycle, Estrus Detection, Signs of Heat in Cattle, Gestation Lengths, and Parturition',
      'Artificial Insemination (AI): Collection of Semen, Dilution, Cryopreservation, Insemination Techniques, and Pros/Cons',
      'Animal Nutrition: Balanced Rations, Maintenance vs Production Rations, Feed Conversion Ratio (FCR)',
      'Malnutrition in Farm Animals: Symptoms of Mineral and Vitamin Deficiencies (Rickets, Milk Fever, Ketosis)',
      'WASSCE Specimen Lab: Anatomy Dissection Models, Digestive Tracts, Reproductive Tracts, and Forage Grasses'
    ],
    3: [
      'Livestock Management: Beef Cattle Production - Housing, Feeding, Castration, Dehorning, Fattening',
      'Dairy Cattle Production: Breeds (White Fulani, Friesian), Milking Techniques, Mastitis Prevention, Milk Pasteurization',
      'Swine Production: Management of Breeding Sows, Farrowing Crates, Piglet Iron Injection, Weaning to Baconers',
      'Sheep and Goat Husbandry: West African Dwarf, Yankasa, Red Sokoto - Housing, Dipping, and Disease Control',
      'Animal Health: Viral Diseases (Foot and Mouth, Rinderpest, Newcastle, Marek’s, African Swine Fever)',
      'Bacterial Diseases: Anthrax, Tuberculosis, Brucellosis, Contagious Bovine Pleuropneumonia (CBPP)',
      'Protozoan and Fungal Diseases: Trypanosomiasis (Sleeping Sickness/Tsetse Fly Vector), Coccidiosis, Aspergillosis',
      'Ectoparasites and Endoparasites: Ticks, Mites, Lice, Tsetse Flies, Tapeworms, Liver Flukes, Roundworms - Lifecycle & Control',
      'Aquaculture and Fish Preservation: Pond Management, Water Quality Monitoring, Induced Breeding, Smoking, Freezing',
      'Apiculture (Beekeeping): Colony Structure (Queen, Drone, Workers), Hive Placement, Honey Extraction, Wax Value'
    ]
  },
  'sss-3': {
    1: [
      'Agricultural Economics: Principles of Demand and Supply Applied to Agricultural Commodities',
      'Elasticity of Demand and Supply for Agricultural Produce: Factors Influencing Price Fluctuations in Nigeria',
      'Price Support, Stabilization Schemes, and Government Grain Reserves in Food Inflation Mitigation',
      'Farm Management: Functions of a Farm Manager (Planning, Organizing, Directing, Controlling, Risk Bearing)',
      'Farm Records and Accounting: Valuation of Farm Assets, Depreciation Methods (Straight Line, Declining Balance)',
      'Farm Financial Statements: Cash Analysis Book, Farm Inventory, Profit and Loss Account, Balance Sheet',
      'Agricultural Marketing: Market Structures (Perfect Competition, Monopoly, Oligopoly), Marketing Boards, Commodity Exchanges',
      'Agricultural Extension: Principles, Extension Teaching Methods (Individual, Group, Mass Media), Communication Barriers',
      'Agricultural Insurance: Types of Farm Insurance Policies, Benefits, and Premium Calculations for Livestock and Crops',
      'WASSCE Practical Specimen Masterclass: Complete Identification, Economic Importance, and Lab Setup for WAEC Specimens'
    ],
    2: [
      'WASSCE Agriculture Section B Essay Clinic: Mastering Agronomy, Animal Science, and Economics Questions',
      'Chief Examiner Rubrics for WAEC Agricultural Science: Common Candidate Errors and Point Deduction Pitfalls',
      'Intensive Soil Science Calculations: Determining Bulk Density, Soil Porosity, Moisture Percentage, and Fertilizer Dosages',
      'Animal Feed Formulation: Pearson Square Method for Formulating Broiler and Layer Rations',
      'Past WASSCE Practical Paper 3 Analysis: Real Specimens (Rocks, Fertilizers, Weeds, Pests, Implements, Animal Organs)',
      'Comprehensive Review: Crop Husbandry, Diseases, Causal Organisms, Symptoms, and Integrated Pest Management (IPM)',
      'Comprehensive Review: Animal Production, Husbandry Procedures, Vaccination Schedules, and Biosecurity Rules',
      'Comprehensive Review: Agricultural Economics, Farm Accounts, Depreciation, and Extension Methodologies',
      'Timed WASSCE Agricultural Science Theory Simulation: Answering 5 Compulsory Essay Questions in 130 Minutes',
      'WASSCE Full Mock Examination: Paper 1 (60 Objective Questions) & Paper 2 (Theory) Testing'
    ],
    3: [
      'WASSCE Marathon Revision: Agronomy, Crop Classification, and Crop Improvement Synthesized Review',
      'WASSCE Marathon Revision: Animal Husbandry, Anatomy, Nutrition, and Health Masterclass',
      'WASSCE Marathon Revision: Soil Science, Soil Chemistry, Fertility, and Conservation Techniques',
      'WASSCE Marathon Revision: Farm Mechanization, Tractor Operations, and Modern Precision Agriculture',
      'WASSCE Marathon Revision: Agricultural Economics, Credit, Accounting, and Marketing Frameworks',
      'WASSCE Practical Specimen Speed Run: 15 Specimen Stations with High-Speed Diagnostic Questions',
      'WAEC/NECO Chief Examiner Guidelines: Perfecting Technical Botanical and Zoological Terminology in Answers',
      'Multi-Year Past Objective Question Drills (2018–2025): Target 100% Accuracy in 50 Minutes',
      'Final Terminal Rehearsal: Stress-free Examination Logistics, Time Management, and Script Presentation',
      'Terminal Review and Final Blessing for WASSCE / NECO Examination Candidates'
    ]
  }
};

// ---------------------------------------------------------------------------
// 2. BASIC TECHNOLOGY (JSS 1–3)
// ---------------------------------------------------------------------------
export const BASIC_TECHNOLOGY_CURRICULUM: LevelCurriculumMap = {
  'jss-1': {
    1: [
      'Understanding Technology: Meaning, Scope, Importance in Society, and Technological Literacy',
      'Technology in Nigeria: Traditional/Indigenous Technologies (Blacksmithing, Bronze Casting, Weaving, Pottery)',
      'Modern STEM & Engineering Careers: Civil, Electrical, Mechanical, Chemical, Computer, and Aeronautical',
      'Workshop Safety Rules: Common Causes of Workshop Accidents and General Preventative Regulations',
      'Personal Protective Equipment (PPE): Safety Boots, Helmets, Goggles, Ear Defenders, Gloves, Aprons',
      'Safety Signs and Color Codes: Prohibition (Red), Warning/Caution (Yellow), Mandatory (Blue), Safe Condition (Green)',
      'First Aid: Definition, First Aid Box Contents, and Treatment of Minor Cuts, Thermal Burns, and Electric Shock',
      'Fire Outbreaks in Workshops: Fire Triangle (Fuel, Heat, Oxygen), Classification of Fires (Class A, B, C, D)',
      'Fire Extinguishing Equipment: Water, Foam, Carbon Dioxide, Dry Chemical Powder, Fire Blankets - Operation (PASS)',
      'Workshop Organization: Safety Management, Cleanliness, Tool Storage Racks, and Routine Maintenance'
    ],
    2: [
      'Properties of Materials: Wood - Classification into Hardwoods (Deciduous) and Softwoods (Coniferous)',
      'Properties of Wood: Grain, Density, Color, Cellular Structure, and Common Nigerian Timber Species (Iroko, Mahogany, Obeche)',
      'Properties of Metals: Classification into Ferrous Metals (Contain Iron) and Non-Ferrous Metals (Free of Iron)',
      'Properties of Ferrous Metals: Mild Steel, Carbon Steel, Cast Iron, Wrought Iron - Physical and Mechanical Properties',
      'Properties of Non-Ferrous Metals: Aluminum, Copper, Brass, Bronze, Lead, Zinc - Conductive and Corrosion Properties',
      'Properties of Plastics: Thermoplastics (Recyclable) vs Thermosetting Plastics (Non-recyclable) - Everyday Applications',
      'Properties of Ceramics and Glass: Raw Materials (Clay, Sand, Feldspar), Brittleness, Thermal Insulation, and Uses',
      'Properties of Rubber: Natural Rubber (Latex Vulcanization) vs Synthetic Rubber - Elasticity, Waterproofing, and Uses',
      'Drawing Instruments and Materials: Drawing Board, Tee-square, Set-squares (30°/60° and 45°), Compasses, Dividers, Scale Rule',
      'Care and Maintenance of Technical Drawing Equipment: Proper Paper Alignment, Masking Tape, and Pencil Sharpening'
    ],
    3: [
      'Basic Technical Drawing: Title Block Layout, Border Lines, Standard Sheet Sizes (A1, A2, A3, A4)',
      'Freehand Sketching: Techniques, Grip, Straight Lines, Curves, Circles, Ellipses, and Workshop Component Sketches',
      'Scale Drawing: Full Size (1:1), Reduction Scales (1:2, 1:5, 1:10), Enlargement Scales (2:1, 5:1) - Practical Examples',
      'Lines Used in Technical Drawing: Continuous Thick (Outlines), Continuous Thin (Dimension/Projection), Dashed (Hidden Details)',
      'Center Lines (Long-short dash), Cutting Plane Lines, Construction Lines, and Break Lines',
      'Dimensioning Techniques in Technical Drawing: Aligned System vs Unidirectional System - Rules and Leader Lines',
      'Plane Geometry: Bisection of Straight Lines and Line Segments using Compass and Straightedge',
      'Construction of Angles using Pair of Compasses: 90°, 60°, 30°, 45°, 75°, 105°, 120°, 135°',
      'Triangles: Types (Equilateral, Isosceles, Scalene, Right-angled) - Construction when Sides and Angles are Given',
      'Practical Workshop Project: Constructing a Simple Wooden or Acrylic Paperweight / Memo Holder'
    ]
  },
  'jss-2': {
    1: [
      'Woodwork Hand Tools: Measuring and Marking Out Tools (Rule, Try Square, Mortise Gauge, Marking Knife)',
      'Woodwork Cutting Tools: Saws (Rip Saw, Cross-cut Saw, Tenon Saw, Dovetail Saw, Coping Saw) - Parts and Pitch',
      'Woodwork Planing Tools: Jack Plane, Trying Plane, Smoothing Plane, Spokeshave - Care, Adjustment, and Operation',
      'Woodwork Chiseling Tools: Firmer Chisel, Bevel-edge Chisel, Mortise Chisel, Wooden Mallet - Safe Usage',
      'Metalwork Hand Tools: Measuring and Marking Tools (Steel Rule, Scriber, Center Punch, Dividers, Surface Plate)',
      'Metalwork Guiding and Supporting Tools: Bench Vise, Clamp, V-block, Angle Plate, Engineer’s Try Square',
      'Metalwork Cutting Tools: Hacksaws (Fixed and Adjustable Frames, Blade TPI Selection), Files (Flat, Round, Half-Round)',
      'Metalwork Chisels: Cold Chisel, Flat Chisel, Cross-cut Chisel, Diamond-point Chisel - Cutting Angles and Dressing',
      'Concept of Energy: Renewable Energy Sources (Solar, Wind, Hydro, Biomass) vs Non-Renewable (Fossil Fuels, Natural Gas)',
      'Energy Conversion Systems: Converting Mechanical to Electrical (Generators), Electrical to Mechanical (Electric Motors)'
    ],
    2: [
      'Transmission of Motion: Belt Drives, Pulleys, and Velocity Ratio Calculations',
      'Chain and Sprocket Drives: Bicycle Transmission, Advantages over Belt Drives, Lubrication Requirements',
      'Gear Drives: Types of Gears (Spur, Helical, Bevel, Worm and Wheel, Rack and Pinion) - Speed and Direction of Rotation',
      'Linear and Rotary Motion Conversion: Crank and Slider Mechanisms, Cam and Follower Applications in Engines',
      'Hydraulic and Pneumatic Systems: Pascal’s Principle, Hydraulic Jack, Hydraulic Brakes, Pneumatic Drills',
      'Friction in Machines: Advantages (Traction, Braking) and Disadvantages (Wear, Heat Loss) - Reduction with Lubricants',
      'Building Construction: Components of a Simple Building (Substructure/Foundation vs Superstructure)',
      'Building Foundations: Types (Strip, Pad, Raft, Pile Foundations) - Excavation and Concrete Pouring',
      'Walls and Wall Materials: Sandcrete Blocks, Bricks, Mortar Ratios, Bonding Patterns (Stretcher, Header Bond)',
      'Floors and Openings: Ground Floor Slabs (Damp Proof Membrane - DPM), Lintels, Door and Window Frames'
    ],
    3: [
      'Woodwork Joints: Widening Joints (Butt, Tongue and Groove, Dowelled Joint)',
      'Angle and Framing Joints: Mortise and Tenon Joint, Halving Joints (Corner, Cross), Bridle Joints',
      'Housing Joints and Dovetail Joints: Box Joint, Through Dovetail - Assembly and Glue Clamping',
      'Metalwork Joining Methods: Temporary Fasteners (Bolts and Nuts, Screws, Studs, Washers, Cotter Pins)',
      'Permanent Joining: Riveting, Soft Soldering (Tin-Lead Alloy, Flux, Soldering Iron), Hard Soldering (Brazing)',
      'Technical Drawing: Polygons - Construction of Regular Pentagon, Hexagon, and Octagon within a Given Circle',
      'Inscribing and Circumscribing Polygons in Circles: Step-by-Step Geometric Construction',
      'Tangents and Tangency: Constructing Internal and External Tangents to Circles and Arcs',
      'Elementary Orthographic Projection: Concept of First Angle Projection - Front Elevation, Plan, and End Views',
      'Practical Workshop Project: Fabrication of a Sheet Metal Tool Caddy or Dustpan using Riveting and Folding'
    ]
  },
  'jss-3': {
    1: [
      'Wood Processing: Timber Conversion Methods (Plain/Through and Through Sawing, Quarter Sawing, Tangential Sawing)',
      'Timber Seasoning: Reasons for Seasoning (Prevent Warping, Twisting, Rot) - Natural Air Seasoning vs Artificial Kiln Seasoning',
      'Defects in Timber: Natural Defects (Knots, Shakes) vs Artificial Seasoning Defects (Bowing, Cupping, Warping, Checks)',
      'Wood Preservation: Types of Preservatives (Creosote, Water-borne, Oil-borne) and Methods of Application (Brushing, Pressure)',
      'Manufactured Boards: Plywood, Chipboard, Fiberboard (MDF), Blockboard - Manufacturing Process and Structural Uses',
      'Metal Processing: Extraction of Iron from Iron Ore in the Blast Furnace (Charge: Ore, Coke, Limestone)',
      'Steel Production: Basic Oxygen Furnace and Electric Arc Furnace - Plain Carbon Steels (Low, Medium, High Carbon)',
      'Heat Treatment of Steel: Annealing, Normalizing, Hardening, and Tempering - Altering Mechanical Properties',
      'Plastics Manufacturing: Injection Moulding, Blow Moulding, Extrusion, Compression Moulding Processes',
      'Ceramics and Glass Production: Clay Kneading, Throwing on Potters Wheel, Glazing, Kiln Firing, Glass Blowing'
    ],
    2: [
      'Simple Electrical Circuits: Series Circuits, Parallel Circuits, Ohm’s Law ($V = IR$) Calculations',
      'Electrical Circuit Components: Switches, Resistors, Capacitors, Fuses, Circuit Breakers, Dry Cells, Accumulators',
      'Domestic Electrical Wiring: Cable Types, Live, Neutral, and Earth Wires - Color Codes (Brown, Blue, Green/Yellow)',
      'Electrical Safety in the Home: Fuses, Earth Leakage Circuit Breakers (ELCB), Preventing Overload and Short Circuits',
      'Electronics Fundamentals: Conductors, Insulators, and Semiconductors (Silicon, Germanium)',
      'Semiconductor Devices: P-N Junction Diode - Forward and Reverse Bias, Rectification (AC to DC)',
      'Light Emitting Diodes (LED) and Transistors: NPN and PNP Transistors as Switches and Amplifiers',
      'Integrated Circuits (IC) and Microchips: Evolution of Electronics in Nigerian Telecommunications and Computing',
      'Technical Drawing: Orthographic Projection - First Angle vs Third Angle Projection Symbols and Rules',
      'Isometric Drawing: Isometric Axes (30° to Horizontal), Isometric Box Method for Oblique and Shaped Blocks'
    ],
    3: [
      'Oblique Drawing: Cavalier (Full Depth) vs Cabinet (Half Depth) Projections at 45° Angle',
      'Perspective Drawing: One-Point Perspective, Vanishing Points, Horizon Line, Station Point Principles',
      'Development of Simple Geometrical Solids: Prisms, Pyramids, Cylinders, and Cones (Sheet Metal Templates)',
      'Sectional Views in Technical Drawing: Full Sections, Half Sections, Section Lines (45° Hatching)',
      'BECE Technical Drawing Practice: Reading Working Drawings, Dimension Interpretation, and Component Orthographic Drafting',
      'Comprehensive Review of Basic Technology Hand Tools: Woodwork, Metalwork, and Machine Tools (Lathe, Drill Press)',
      'Comprehensive Review of Energy, Mechanisms, and Power Transmission: Velocity Ratios and Mechanical Advantage',
      'Comprehensive Review of Building Technology: Substructure, Roof Trusses, Roofing Materials, and Drainage',
      'Timed BECE Multiple Choice Speed Drills: 60 Standard Questions with Examiner Explanations',
      'Final BECE Mock Practical and Theory Examination: Portfolio Review and National Readiness'
    ]
  }
};

// ---------------------------------------------------------------------------
// 3. COMPUTER STUDIES & DATA PROCESSING (JSS 1–3, SSS 1–3)
// ---------------------------------------------------------------------------
export const COMPUTER_STUDIES_CURRICULUM: LevelCurriculumMap = {
  'jss-1': {
    1: [
      'Introduction to Computer Studies: Definition, Characteristics, Functions (Input, Processing, Output, Storage)',
      'Evolution of Computing: Early Counting Devices (Fingers, Stones, Abacus, Napier Bones, Slide Rule)',
      'Mechanical and Electro-Mechanical Calculators: Pascaline, Leibniz Multiplier, Babbage’s Analytical and Difference Engines',
      'Ada Lovelace and the Foundation of Computer Programming',
      'Computer Generations: 1st Gen (Vacuum Tubes), 2nd Gen (Transistors), 3rd Gen (ICs), 4th Gen (Microprocessors), 5th Gen (AI)',
      'Classification of Computers by Size: Supercomputers, Mainframes, Minicomputers, Microcomputers (PCs, Laptops, Tablets)',
      'Classification by Function/Data Handled: Analog, Digital, and Hybrid Computers',
      'Classification by Purpose: General Purpose vs Special Purpose Computers',
      'The Computer System: Hardware, Software, and Peopleware Components',
      'Computer Room / Laboratory Management: Cleanliness, Dust Covers, Uninterruptible Power Supply (UPS), Ergonomics'
    ],
    2: [
      'Input Devices: Definition, Types - Keyboard, Mouse, Scanner, Joystick, Barcode Reader, Microphone, Webcam',
      'The Computer Keyboard: Layout (QWERTY), Function Keys (F1-F12), Alphanumeric Keys, Numeric Keypad, Control Keys',
      'The Mouse: Types (Optical, Wireless, Mechanical), Actions (Click, Double-click, Right-click, Drag and Drop, Scroll)',
      'Output Devices: Monitors (CRT, LCD, LED, OLED), Resolution, Pixels, Screen Sizes',
      'Printers: Impact Printers (Dot Matrix) vs Non-Impact Printers (Inkjet, Laser, 3D Printers) - Speed (PPM) and Quality (DPI)',
      'Other Output Devices: Speakers, Headphones, Multimedia Projectors, Plotters',
      'System Unit: Exterior Components (Power Button, Optical Drive, USB Ports, Audio Jacks, Ventilation Fans)',
      'Inside the System Unit: Motherboard, Central Processing Unit (CPU), RAM Slots, Expansion Slots, Power Supply Unit (PSU)',
      'The Central Processing Unit (CPU): Arithmetic Logic Unit (ALU), Control Unit (CU), Registers, Clock Speed (GHz)',
      'Primary Storage: Random Access Memory (RAM - Volatile) vs Read Only Memory (ROM - Non-volatile, BIOS/UEFI)'
    ],
    3: [
      'Secondary Storage Devices: Hard Disk Drives (HDD), Solid State Drives (SSD), USB Flash Drives, Memory Cards, Optical Discs',
      'Data Representation and Units of Storage: Bit, Nibble, Byte, Kilobyte (KB), Megabyte (MB), Gigabyte (GB), Terabyte (TB)',
      'Computer Software: System Software vs Application Software',
      'Operating Systems: Meaning, Functions (Process Management, Memory Allocation, Device Handling, User Interface)',
      'Types of Operating Systems: Graphical User Interface (GUI - Windows, macOS, Android) vs Command Line (CLI - MS-DOS, Linux)',
      'Introduction to Word Processing: Launching Word Processors (Microsoft Word, Google Docs), Workspace Layout, Ribbons',
      'Creating, Editing, Formatting Text (Font, Size, Color, Alignment, Bold, Italic, Underline), and Saving Documents',
      'Printing Word Documents: Print Preview, Page Setup, Paper Size (A4), Margins, and Orientation',
      'Digital Literacy and Computer Ethics: Cyber Hygiene, Proper Shutdown Procedures, Protecting Equipment',
      'Practical Computer Lab Project: Typing a Formatted School Essay and Saving to Personal Folder'
    ]
  },
  'jss-2': {
    1: [
      'Computer Hardware Servicing: Peripheral Connection (VGA, HDMI, USB, Ethernet, Audio Cables)',
      'Power Protection Devices: Surge Protectors, Voltage Stabilizers, UPS - Preventing Hardware Damage from Power Spikes',
      'Computer Software Classification: Application Software - Word Processors, Spreadsheets, Presentation, Database, Graphics',
      'Utility Software: Antivirus Programs, Disk Defragmenter, File Compression (Zip), Backup Utilities',
      'Computer Viruses: Meaning, Types (Trojan, Worm, Ransomware, Spyware, Rootkit), Transmission Vectors',
      'Symptoms of Virus Infection: Slow Performance, Missing Files, Frequent Crashes, Strange Pop-ups',
      'Virus Prevention and Antivirus Software: Definition, Regular Definition Updates, Real-time Scanning, Safe Browsing',
      'Internet Fundamentals: Meaning, History (ARPANET), World Wide Web (WWW), Internet Service Providers (ISPs in Nigeria)',
      'Internet Browsers: Google Chrome, Mozilla Firefox, Microsoft Edge, Safari - Omnibox, Tabs, Bookmarks, History',
      'Electronic Mail (Email): Meaning, Email Address Syntax (`user@domain.com`), Creating Accounts, Composing, Attachments'
    ],
    2: [
      'Electronic Spreadsheets: Definition, Examples (Microsoft Excel, Google Sheets), Uses in Financial Calculations and Tabulation',
      'Spreadsheet Terminology: Rows (Numbers), Columns (Letters), Cells (A1), Active Cell, Formula Bar, Name Box, Worksheets',
      'Data Types in Spreadsheets: Labels (Text), Values (Numbers), Dates, Formulas',
      'Entering and Formatting Data: Bold, Borders, Number Formats (Naira Currency ₦, Percentages, Decimals)',
      'Basic Arithmetic Formulas in Spreadsheets: Addition (`+`), Subtraction (`-`), Multiplication (`*`), Division (`/`)',
      'Standard Mathematical Functions: `SUM`, `AVERAGE`, `COUNT`, `MAX`, `MIN` - Syntax and Applications',
      'Creating Simple Charts in Spreadsheets: Column Charts, Bar Charts, Pie Charts - Adding Titles and Legends',
      'Computer Number Bases: Binary (Base 2), Octal (Base 8), Decimal (Base 10), Hexadecimal (Base 16)',
      'Conversion of Decimal Numbers to Binary and Binary to Decimal (Division and Place Value Methods)',
      'Binary Addition and Subtraction: Rules of Binary Arithmetic ($0+0, 0+1, 1+0, 1+1=10$)'
    ],
    3: [
      'Graphic Packages: Meaning, Examples (CorelDraw, Adobe Photoshop, Microsoft Paint, Canva)',
      'Paint Environment: Toolbox (Pencil, Brush, Eraser, Fill Tool, Shapes), Canvas, Color Palette',
      'Creating Basic Illustrations and Geometric Shapes in Paint / Vector Graphics',
      'Information and Communication Technology (ICT): Meaning, Components, Impact on Banking (ATMs, USSD), Education, Healthcare',
      'Telecommunications Systems: GSM Technology, SIM Cards, Cell Towers, Satellite Communications in Nigeria',
      'Networking Concepts: Local Area Network (LAN), Metropolitan Area Network (MAN), Wide Area Network (WAN)',
      'Network Topologies: Star, Bus, Ring, Mesh, Tree Topologies - Advantages and Drawbacks',
      'Network Devices: Routers, Switches, Hubs, Modems, Network Interface Cards (NIC), Ethernet Patch Cords',
      'Computer Ethics and Cyber Law: Plagiarism, Copyright Infringement, Software Piracy, Cybercrime Act of Nigeria',
      'BECE Practical Mock Exam: Typing and Formatting a Spreadsheet with SUM and AVERAGE Formulas'
    ]
  },
  'jss-3': {
    1: [
      'Computer System Architecture: Von Neumann Architecture, Bus Architecture (Data Bus, Address Bus, Control Bus)',
      'Microprocessor Architecture: ALU, Control Unit, Cache Memory (L1, L2, L3), System Clock, Dual/Quad Core CPUs',
      'Logic Gates: Meaning, Types - Standard Logic Gates (AND Gate, OR Gate, NOT Gate/Inverter)',
      'Truth Tables and Logic Symbols for AND, OR, and NOT Gates',
      'Combined Logic Gates: NAND Gate and NOR Gate (Universal Gates) - Symbols and Truth Tables',
      'Logic Gate Applications: Digital Alarm Systems, Security Door Locks, Simple Binary Adders',
      'Introduction to Computer Programming: Meaning, Machine Language, Low-Level (Assembly), High-Level Languages',
      'High-Level Programming Languages: Python, Java, C++, BASIC - Translators (Compilers vs Interpreters)',
      'Algorithms and Flowcharts: Definition of Algorithm, Characteristics (Finiteness, Definiteness, Input, Output)',
      'Flowchart Symbols: Terminator (Oval), Process (Rectangle), Decision (Diamond), Input/Output (Parallelogram), Connectors'
    ],
    2: [
      'Designing Algorithms and Flowcharts for Simple Everyday and Mathematical Tasks (Even/Odd, Sum of Two Numbers)',
      'Introduction to Web Design: Concept of Web Pages, Websites, URLs, HTML (Hypertext Markup Language)',
      'Basic HTML Structure: `<!DOCTYPE html>`, `<html>`, `<head>`, `<title>`, `<body>` Tags',
      'HTML Text Formatting: Headings `<h1>` to `<h6>`, Paragraphs `<p>`, Line Breaks `<br>`, Formatting (`<b>`, `<i>`, `<u>`)',
      'HTML Lists and Media: Unordered Lists `<ul>`, Ordered Lists `<ol>`, List Items `<li>`, Adding Images `<img>`',
      'HTML Hyperlinks: Anchor Tag `<a>`, `href` Attribute, Linking Internal and External Web Pages',
      'Database Fundamentals: Meaning, Tables, Records, Fields, Primary Keys, DBMS Examples (MS Access, MySQL)',
      'Digital Safety, Data Privacy, and Cyberbullying: Protection Strategies for Adolescents in Nigeria',
      'Career Paths in IT: Software Engineers, Data Analysts, Network Administrators, Cybersecurity Specialists, Cloud Architects',
      'BECE Practical & Theory Revision Drills: Logic Gate Truth Tables, Binary Conversions, and Flowchart Interpretation'
    ],
    3: [
      'Intensive BECE Computer Studies Revision: Computer Hardware, Generations, and Peripheral Technologies',
      'Intensive BECE Computer Studies Revision: System and Application Software, OS Functions, File Management',
      'Intensive BECE Computer Studies Revision: Binary Arithmetic, Logic Gates, and Flowcharts',
      'Intensive BECE Computer Studies Revision: Internet, Networking, Cybersecurity, and Telecommunications',
      'Intensive BECE Computer Studies Revision: Word Processing, Spreadsheet Functions, and Database Concepts',
      'Hands-on Computer Lab Drills: Speed Typing, Spreadsheet Calculations, and Basic HTML Coding',
      'Timed BECE Multiple Choice Speed Drills: 60 High-Frequency BECE Questions',
      'Past BECE Paper Analysis: Common Examiner Traps in Theory and Specimen Identification',
      'Mock BECE Computer Studies Examination: Full Simulation with Instant Scoring and Feedback',
      'Final BECE Examination Briefing and National Certification Readiness'
    ]
  },
  'sss-1': {
    1: [
      'Data and Information: Meaning, Differences, Attributes of Good Information (Accurate, Timely, Relevant, Complete)',
      'Data Processing Cycle: Data Gathering, Input, Processing, Storage, Output, Distribution',
      'Stages of Information Evolution: Pre-Mechanical, Mechanical, Electro-Mechanical, Electronic Age',
      'Computer Hardware Systems: Detailed Functional Units - Input, CPU (ALU, CU, Registers), Storage, Output',
      'Memory Hierarchy: Registers, Cache (L1, L2, L3), RAM, ROM, Virtual Memory, Secondary Storage (Speed vs Capacity)',
      'Secondary Storage Technologies: Magnetic Media (Hard Disks), Optical Media (CD, DVD, Blu-Ray), Flash Solid-State Storage',
      'Operating Systems: Kernel, Shell, File Systems (FAT32, NTFS, EXT4), Process Scheduling, Multi-tasking, Multi-user',
      'Operating System Installation: Clean Install, Partitioning, Formatting, Device Drivers, System Updates',
      'Computer Number Systems: Binary, Octal, Decimal, Hexadecimal Systems - Conversion Algorithms',
      'Character Encoding Systems: ASCII (7-bit and 8-bit), EBCDIC, Unicode (UTF-8, UTF-16) - Representing Text in Binary'
    ],
    2: [
      'Spreadsheets for Advanced Data Processing: Relative vs Absolute Cell Referencing (`$A$1`), Named Ranges',
      'Advanced Functions in Spreadsheets: Nested `IF` Statements, `VLOOKUP`, `HLOOKUP`, `COUNTIF`, `SUMIF`',
      'Data Analysis with Spreadsheets: Sorting, Filtering, Conditional Formatting, What-If Analysis',
      'Database Management Systems (DBMS): Meaning, Flat-File vs Relational Database Management Systems (RDBMS)',
      'Database Architecture: Tables, Tuples/Records, Attributes/Fields, Domains, Views',
      'Relational Database Keys: Candidate Key, Primary Key, Foreign Key, Composite Key - Referential Integrity',
      'Creating Tables and Defining Field Properties: Text, Number, Date/Time, Currency, AutoNumber, Validation Rules',
      'Database Queries: Structured Query Language (SQL) - `SELECT`, `FROM`, `WHERE`, `ORDER BY`, `GROUP BY`',
      'Database Forms and Reports: Generating User-Friendly Input Screens and Professional Summary Reports',
      'WASSCE Data Processing Lab: Constructing a Multi-Table Database with Foreign Keys and Queries'
    ],
    3: [
      'Presentation Software: Microsoft PowerPoint, Google Slides - Slide Layouts, Master Slides, Slide Transitions',
      'Delivering Effective Digital Presentations: Animations, Speaker Notes, Embedded Audio/Video, Hyperlinks',
      'Word Processing for Publishing: Mail Merge (Data Source, Main Document, Merged Letters), Table of Contents, Indexes',
      'Desktop Publishing (DTP): Principles of Page Design, Margin, Grid, Kerning, Leading, Resolution (DPI)',
      'Computer Graphics: Raster Graphics (Pixels, JPEG, PNG, GIF) vs Vector Graphics (Vectors, SVG, AI, CDR)',
      'Image Editing Operations: Cropping, Resizing, Brightness/Contrast, Layers, Masking, Filtering',
      'Internet Protocols: TCP/IP Stack, HTTP, HTTPS, FTP, SMTP, POP3, IMAP, DNS, DHCP, IP Addressing (IPv4 vs IPv6)',
      'Web Design with CSS: Inline, Internal, and External Style Sheets - Selectors, Colors, Box Model (Margin, Border, Padding)',
      'Digital Safety and Ethics: Intellectual Property Rights, Plagiarism, Creative Commons, Software Licensing',
      'Termly Practical Portfolio Assessment: Database Query Reports and Formatted Mail Merge Letters'
    ]
  },
  'sss-2': {
    1: [
      'Central Processing Unit Architecture: Machine Cycle (Fetch, Decode, Execute, Store), Instruction Register, Program Counter',
      'Parallel Processing, Pipelining, Multi-Core Processors, and Hyper-Threading Technology',
      'Boolean Algebra and Logic Circuits: Postulates, Theorems (De Morgan’s Laws, Commutative, Associative, Distributive)',
      'Simplification of Boolean Expressions using Boolean Algebra and Karnaugh Maps (K-Maps)',
      'Design of Combinational Logic Circuits: Half Adders, Full Adders, Decoders, Encoders, Multiplexers',
      'Computer Networking: OSI 7-Layer Reference Model (Physical, Data Link, Network, Transport, Session, Presentation, Application)',
      'Network Transmission Media: Guided Media (Twisted Pair Cat5e/Cat6, Coaxial, Fiber Optic Cables)',
      'Unguided Wireless Media: Radio Waves, Microwaves, Infrared, Satellite, Wi-Fi (802.11 standards), Bluetooth',
      'Network Security: Firewalls, Intrusion Detection Systems (IDS), Virtual Private Networks (VPN), Encryption (Symmetric vs Asymmetric)',
      'Cybersecurity Threats: Denial of Service (DoS/DDoS), Man-in-the-Middle (MitM), SQL Injection, Cross-Site Scripting (XSS)'
    ],
    2: [
      'Algorithms and Problem Solving: Stepwise Refinement, Flowcharts, Pseudocode Conventions',
      'Introduction to High-Level Programming with Python: Syntax, Identifiers, Keywords, Indentation',
      'Data Types and Variables in Python: Integers, Floats, Strings, Booleans - Type Casting',
      'Operators in Python: Arithmetic, Relational/Comparison, Logical (`and`, `or`, `not`), Assignment Operators',
      'Control Flow Statements: Conditional Statements (`if`, `if-else`, `if-elif-else`)',
      'Looping Structures: `while` Loops, `for` Loops, Iterating Over Ranges and Strings, `break` and `continue`',
      'Data Structures in Python: Lists (Indexing, Slicing, Appending, Modifying) and Tuples',
      'Dictionaries and Sets in Python: Key-Value Pairs, Set Operations (Union, Intersection)',
      'Functions in Python: Built-in Functions, Defining Custom Functions (`def`), Arguments, Return Values, Scope',
      'WASSCE Practical Coding Lab: Writing Python Programs to Solve Real-world Mathematical and Data Sorting Tasks'
    ],
    3: [
      'File Handling in Python: Reading Text Files (open(), "r"), Writing ("w"), Appending ("a"), Closing Files',
      'System Development Life Cycle (SDLC): Phases - Feasibility Study, Analysis, Design, Development, Testing, Deployment, Maintenance',
      'Software Testing Methodologies: Unit Testing, Integration Testing, System Testing, Acceptance Testing, Debugging',
      'Big Data and Cloud Computing: Cloud Service Models (IaaS, PaaS, SaaS), Cloud Deployment (Public, Private, Hybrid)',
      'Artificial Intelligence and Machine Learning: Definition, History, Supervised, Unsupervised, and Reinforcement Learning',
      'Ethical, Legal, and Social Implications of AI: Algorithmic Bias, Deepfakes, Job Automation, Data Privacy',
      'E-Commerce and Digital Financial Systems: Payment Gateways, Cryptography, Blockchain Fundamentals in Nigeria (eNaira, FinTech)',
      'Data Backup and Disaster Recovery Planning: On-site, Off-site, RAID Configurations, Recovery Time Objectives (RTO)',
      'Practical Database Project: Designing a School Management Database with SQL Joins (`INNER JOIN`, `LEFT JOIN`)',
      'Termly Practical Portfolio Assessment: Tested Python Applications and SDLC Documentation'
    ]
  },
  'sss-3': {
    1: [
      'WASSCE Data Processing / Computer Studies Exam Blueprint: Breakdown of Paper 1 (Objective), Paper 2 (Theory), Paper 3 (Practical)',
      'Advanced Database Management for WAEC: Multi-table Relational Design, Normalization (1NF, 2NF, 3NF)',
      'SQL Masterclass: Complex Data Extraction, Nested Queries, Aggregations, Views, Indexes',
      'WASSCE Practical Excel Drills: Advanced Data Sorting, Nested Formulas, Financial Projections, Macro Automation',
      'WASSCE Practical Word Processing & DTP Drills: Complex Columnar Layouts, Tabular Insets, Mail Merge Execution',
      'Computer Maintenance, Troubleshooting, and Diagnostics: POST Errors, Beep Codes, BSOD, Registry Repair',
      'Network Troubleshooting: `ping`, `traceroute`, `ipconfig`, `netstat` Commands, Packet Loss Remediation',
      'National and International Cyber Laws: Nigeria Cybercrimes Act (2015/2024), NDPR (2019), GDPR, Copyright Violations',
      'WASSCE Paper 2 Theory Strategy: Structuring High-Scoring Answers on Architecture, Networking, and Databases',
      'Full WASSCE Practical Paper 3 Simulation: Timed 2-Hour Hands-on Database and Spreadsheet Assessment'
    ],
    2: [
      'Intensive Review: Logic Gates, Boolean Algebra, Truth Tables, and Logic Circuit Simplification',
      'Intensive Review: Computer Number Bases, Binary Arithmetic, 1’s and 2’s Complements, Floating Point Formats',
      'Intensive Review: CPU Architecture, Memory Hierarchy, Bus Standards, and Peripheral Interfacing',
      'Intensive Review: Operating Systems, Process Management, Memory Allocation, and File Systems',
      'Intensive Review: Networking, OSI Model, TCP/IP, Transmission Media, and Network Security Protocols',
      'Intensive Review: Programming Concepts, SDLC Stages, Flowcharts, Pseudocode, and Python Logic',
      'Intensive Review: Word Processing, Spreadsheets, Presentation Software, and Graphics Packages',
      'Chief Examiner Guidelines: Common Errors in WAEC Computer Studies and Pitfalls in Practical Submissions',
      'Timed WASSCE Objective Speed Drills: 50 Questions in 40 Minutes with Instant Analytics',
      'Full Mock Examination: Combined Paper 1, Paper 2, and Paper 3 Testing with Standard Marking Scheme'
    ],
    3: [
      'WASSCE Computer Studies Intensive Marathon: Architecture, Microprocessors, and Hardware Systems',
      'WASSCE Marathon: Data Processing, Relational Databases, SQL Queries, and Normalization Masterclass',
      'WASSCE Marathon: Networking, Internet Architecture, Protocols, and Cybersecurity Defenses',
      'WASSCE Marathon: Programming Logic, Algorithms, Python Syntax, and SDLC Methodologies',
      'Multi-Year WAEC Past Question Diagnostic Clinic (2017–2025): Step-by-Step Examiner Analysis',
      'WASSCE Practical Hands-on Rehearsal: Rapid Execution of Database Queries and Spreadsheet Data Analysis',
      'Final Review of Emerging Technologies: IoT, Cloud Services, AI, Blockchain, and Robotics in West Africa',
      'Exam Day Logistics: Software Compatibility, File Saving Protocols, Backup Flash Drives, Printout Verification',
      'Terminal Review and Final Blessing for WASSCE / NECO Examination Candidates',
      'Post-Secondary Career Orientation: University Computer Science, Software Engineering, and Global Certifications'
    ]
  }
};
