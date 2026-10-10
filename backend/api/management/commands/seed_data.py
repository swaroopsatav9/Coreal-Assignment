from django.core.management.base import BaseCommand
from api.models import Solution, Industry, Property, NetworkMetric, FAQItem

class Command(BaseCommand):
    help = 'Seeds initial data for COREAL Commercial Real Estate Platform'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting data seeding for COREAL...'))

        # 1. Solutions Data
        solutions_data = [
            {
                "name": "Dark Stores",
                "slug": "dark-stores",
                "icon": "Zap",
                "description": "Bulk dark-store deals across the pan-India network for 10-minute delivery & quick-commerce.",
                "popular": True
            },
            {
                "name": "Warehouses",
                "slug": "warehouses",
                "icon": "Warehouse",
                "description": "From last-mile units to large-format regional distribution centers.",
                "popular": True
            },
            {
                "name": "Commercial & Offices",
                "slug": "commercial-spaces",
                "icon": "Building2",
                "description": "Offices, Corporate campuses and service centers, Pin-code-wise.",
                "popular": True
            },
            {
                "name": "Bank Branches & ATMs",
                "slug": "bank-branches",
                "icon": "Landmark",
                "description": "Branch, ATM and vault networks — Footfall-mapped and compliant.",
                "popular": False
            },
            {
                "name": "Healthcare & Pharma",
                "slug": "healthcare-pharma",
                "icon": "Activity",
                "description": "Hospitals, Clinics and pharma facilities sited and fitted for compliance from day one.",
                "popular": False
            },
            {
                "name": "Retail & High-Street",
                "slug": "retail-spaces",
                "icon": "ShoppingBag",
                "description": "High-street, Mall and neighborhood storefronts that convert.",
                "popular": True
            },
            {
                "name": "Logistics Parks",
                "slug": "logistics-parks",
                "icon": "Truck",
                "description": "Large-format parks and land on the main transport corridors.",
                "popular": False
            },
            {
                "name": "Cold Storage",
                "slug": "cold-storage",
                "icon": "Snowflake",
                "description": "Temperature-controlled storage that keeps the food & pharma supply chain unbroken.",
                "popular": False
            },
        ]

        solutions_dict = {}
        for s_data in solutions_data:
            sol, created = Solution.objects.update_or_create(
                slug=s_data['slug'],
                defaults=s_data
            )
            solutions_dict[sol.slug] = sol
            self.stdout.write(f"Solution: {sol.name}")

        # 2. Industries Data
        industries_data = [
            {"name": "Quick Commerce", "slug": "quick-commerce", "description": "Dark stores at delivery-grade density — everywhere you promise 10 minutes."},
            {"name": "E-Commerce", "slug": "ecommerce", "description": "Fulfillment and last-mile footprints that scale with your order volume."},
            {"name": "Commercial & Offices", "slug": "commercial", "description": "Grade-A corporate offices, managed spaces, IT parks & business centers nationwide."},
            {"name": "Banks & NBFCs", "slug": "bfsi", "description": "Branches, ATMs, vaults and back-office — footfall-mapped, compliance-clean."},
            {"name": "BFSI Sector", "slug": "insurance", "description": "Branch offices, regional hubs and service centers across every zone."},
            {"name": "Healthcare & Pharma", "slug": "healthcare", "description": "Clinics, diagnostics and compliant pharma distribution — sited for patients and regulators alike."},
            {"name": "Logistics & Warehousing", "slug": "warehousing", "description": "Warehouses, parks and cross-docks — compact last-mile to large-format DC."},
            {"name": "Food & Beverages", "slug": "food-beverages", "description": "Cold chains, central kitchens and distribution — an unbroken supply line."},
            {"name": "Grocery & Retail", "slug": "retail", "description": "High-street, mall and feeder space — organized retail, city by city."},
        ]

        for ind_data in industries_data:
            ind, _ = Industry.objects.update_or_create(slug=ind_data['slug'], defaults=ind_data)
            self.stdout.write(f"Industry: {ind.name}")

        # 3. Network Metrics Data
        metrics_data = [
            {"key": "states", "value": "28", "label": "States", "subtext": "+8 Union Territories"},
            {"key": "cities", "value": "750+", "label": "Cities", "subtext": "Across Tier 1-4"},
            {"key": "pincodes", "value": "11K+", "label": "PIN Codes", "subtext": "Mapped & Serviceable"},
            {"key": "areas", "value": "65K+", "label": "Areas", "subtext": "Across India"},
            {"key": "partners", "value": "175K+", "label": "Associate Partners", "subtext": "Enrolled nationwide"},
            {"key": "agreement", "value": "1", "label": "Simple Agreement", "subtext": "Master Lease Framework"},
        ]

        for m_data in metrics_data:
            NetworkMetric.objects.update_or_create(key=m_data['key'], defaults=m_data)

        # 4. Verified Sample Properties
        properties_data = [
            {
                "title": "Prime Micro Dark Store Unit - Andheri East",
                "slug": "dark-store-andheri-east-400069",
                "solution_slug": "dark-stores",
                "space_type": "Dark Store",
                "city": "Mumbai",
                "state": "Maharashtra",
                "pincode": "400069",
                "locality": "Andheri East",
                "area_sqft": 3200,
                "price_per_sqft": 110.00,
                "monthly_rent": 352000.00,
                "listing_type": "Lease",
                "is_verified": True,
                "verification_badge": "COREAL Verified 100%",
                "features": ["10-Min Radius Coverage", "Ground Floor Access", "High Power Sanction (40kW)", "24/7 Security"],
                "description": "Ready-to-occupy dark store facility located in central Andheri East pin code 400069. Optimized for quick commerce hubs, high ceiling height (14ft), wide shutter entrance for quick rider dispatches.",
                "image_url": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
            },
            {
                "title": "Grade-A Logistics Hub & Fulfillment Center",
                "slug": "warehouse-whitefield-560066",
                "solution_slug": "warehouses",
                "space_type": "Warehouse",
                "city": "Bengaluru",
                "state": "Karnataka",
                "pincode": "560066",
                "locality": "Whitefield Industrial Area",
                "area_sqft": 25000,
                "price_per_sqft": 42.00,
                "monthly_rent": 1050000.00,
                "listing_type": "Lease",
                "is_verified": True,
                "verification_badge": "COREAL Verified 100%",
                "features": ["FM2 Flooring", "Dock Levelers (6 Bays)", "Fire Sprinkler System", "PEB Structure"],
                "description": "State-of-the-art PEB warehouse in Whitefield Bengaluru. 32 ft clear height, heavy-duty floor load (5T/sqm), excellent highway connectivity for e-commerce and logistics operators.",
                "image_url": "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80"
            },
            {
                "title": "Corporate Office Suite - Cyber City Phase 2",
                "slug": "office-cybercity-122002",
                "solution_slug": "commercial-spaces",
                "space_type": "Commercial Office",
                "city": "Gurugram",
                "state": "Haryana",
                "pincode": "122002",
                "locality": "DLF Cyber City",
                "area_sqft": 12500,
                "price_per_sqft": 145.00,
                "monthly_rent": 1812500.00,
                "listing_type": "Lease",
                "is_verified": True,
                "verification_badge": "COREAL Verified 100%",
                "features": ["Fully Furnished 140 Seats", "LEED Gold Certified", "100% Power Backup", "Dedicated Parking"],
                "description": "Grade-A office floor in DLF Cyber City Gurugram. Features panoramic views, soundproof meeting rooms, executive cabins, and cafeteria.",
                "image_url": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
            },
            {
                "title": "High-Footfall Bank Branch Property - FC Road",
                "slug": "bank-branch-fcroad-411004",
                "solution_slug": "bank-branches",
                "space_type": "Bank Branch",
                "city": "Pune",
                "state": "Maharashtra",
                "pincode": "411004",
                "locality": "Fergusson College Road",
                "area_sqft": 4500,
                "price_per_sqft": 180.00,
                "monthly_rent": 810000.00,
                "listing_type": "Lease",
                "is_verified": True,
                "verification_badge": "COREAL Verified 100%",
                "features": ["Strong Room/Vault Approved", "ATM Kiosk Frontage", "RBI Compliant Layout", "High Footfall"],
                "description": "Ground floor prime commercial space on FC Road Pune ideal for Nationalized or Private Sector Banks, NBFCs, and Wealth Management centers.",
                "image_url": "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=800&q=80"
            },
            {
                "title": "Multi-Specialty Healthcare & Diagnostic Space",
                "slug": "healthcare-hitechcity-500081",
                "solution_slug": "healthcare-pharma",
                "space_type": "Healthcare Facility",
                "city": "Hyderabad",
                "state": "Telangana",
                "pincode": "500081",
                "locality": "HITEC City",
                "area_sqft": 8800,
                "price_per_sqft": 95.00,
                "monthly_rent": 836000.00,
                "listing_type": "Lease",
                "is_verified": True,
                "verification_badge": "COREAL Verified 100%",
                "features": ["Hospital Grade Elevator", "Bio-Waste Disposal Duct", "Radiology Shielded Area", "Ambulance Bay"],
                "description": "Pre-approved healthcare facility space in HITEC City Hyderabad. Suitable for day-care clinics, diagnostic chains, and specialty IVF or dental centers.",
                "image_url": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
            },
            {
                "title": "Corner High-Street Retail Storefront - Connaught Place",
                "slug": "retail-cp-110001",
                "solution_slug": "retail-spaces",
                "space_type": "Retail Space",
                "city": "New Delhi",
                "state": "Delhi",
                "pincode": "110001",
                "locality": "Connaught Place Inner Circle",
                "area_sqft": 2800,
                "price_per_sqft": 350.00,
                "monthly_rent": 980000.00,
                "listing_type": "Lease",
                "is_verified": True,
                "verification_badge": "COREAL Verified 100%",
                "features": ["Double Height Frontage", "Heavy Footfall Corridor", "Valet Parking Access", "Heritage Facade"],
                "description": "Iconic retail location in CP Inner Circle. High visibility, massive pedestrian footfall, perfect for luxury fashion, flagship electronics, or retail dining.",
                "image_url": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
            },
            {
                "title": "Temperature Controlled Cold Storage Unit",
                "slug": "coldstore-bhiwandi-421302",
                "solution_slug": "cold-storage",
                "space_type": "Cold Storage",
                "city": "Bhiwandi (Mumbai MMR)",
                "state": "Maharashtra",
                "pincode": "421302",
                "locality": "Bhiwandi Logistics Belt",
                "area_sqft": 15000,
                "price_per_sqft": 75.00,
                "monthly_rent": 1125000.00,
                "listing_type": "Lease",
                "is_verified": True,
                "verification_badge": "COREAL Verified 100%",
                "features": ["Dual Temp (-20C to +8C)", "PUF Panel Insulation", "Backup Gensets (3x500kVA)", "Pallet Racking Ready"],
                "description": "FSSAI & Pharma Grade Cold Storage warehouse in Bhiwandi logistics corridor. Servicing frozen foods, dairy, pharma, and quick-commerce cold supply chains.",
                "image_url": "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80"
            }
        ]

        for p_data in properties_data:
            sol_slug = p_data.pop('solution_slug')
            p_data['solution'] = solutions_dict.get(sol_slug)
            p, created = Property.objects.update_or_create(
                slug=p_data['slug'],
                defaults=p_data
            )
            self.stdout.write(f"Property: {p.title} [{p.pincode}]")

        # 5. Seed FAQ Items
        faq_items_data = [
            {
                "question": "What is COREAL?",
                "answer": "COREAL is a commercial real estate network that sources verified spaces, such as dark stores, warehouses, offices, retail, bank branches, cold storage and logistics parks, across India, mapped pin code by pin code, under one simple agreement.",
                "category": "Platform",
                "column": "left",
                "order": 1,
                "is_active": True
            },
            {
                "question": "How does the 48-hour process work?",
                "answer": "Share your requirements and target pin codes. COREAL's team searches its network and returns verified, inspected options within 48 hours, so you can shortlist and finalize without visiting sites blindly.",
                "category": "Process",
                "column": "left",
                "order": 2,
                "is_active": True
            },
            {
                "question": "Which cities and pin codes does COREAL cover?",
                "answer": "Coreal serves 750+ cities from Tier 1 to Tier 4, mapped 11,000+ Pin Codes.",
                "category": "Coverage",
                "column": "left",
                "order": 3,
                "is_active": True
            },
            {
                "question": 'What does "one agreement" mean?',
                "answer": "It means a business can source multiple spaces, in different cities, through a single standard agreement with COREAL, instead of negotiating a separate contract with every individual property owner.",
                "category": "Legal & Contracts",
                "column": "right",
                "order": 4,
                "is_active": True
            },
            {
                "question": "Can I lease or buy through COREAL?",
                "answer": "Coreal provides property options for leasing as well as for buying purposes.",
                "category": "Transactions",
                "column": "right",
                "order": 5,
                "is_active": True
            },
            {
                "question": "How does verification work?",
                "answer": "COREAL verifies ownership documents, site details and compliance status before a space is listed, so businesses see only inspected, verified options rather than raw listings.",
                "category": "Verification",
                "column": "right",
                "order": 6,
                "is_active": True
            },
        ]

        for faq in faq_items_data:
            f, _ = FAQItem.objects.update_or_create(
                question=faq['question'],
                defaults=faq
            )
            self.stdout.write(f"FAQ: {f.question}")

        self.stdout.write(self.style.SUCCESS('Successfully seeded COREAL platform data!'))
