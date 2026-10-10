import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Intercept request to add auth token if present
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('coreal_auth_token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Fallback data in case Django server is temporarily unreachable
const FALLBACK_PROPERTIES = [
  {
    id: 1,
    title: "Prime Micro Dark Store Unit - Andheri East",
    space_type: "Dark Store",
    city: "Mumbai",
    pincode: "400069",
    locality: "Andheri East",
    area_sqft: 3200,
    price_per_sqft: 110.00,
    monthly_rent: 352000.00,
    listing_type: "Lease",
    is_verified: true,
    verification_badge: "COREAL Verified 100%",
    features: ["10-Min Radius Coverage", "Ground Floor Access", "High Power Sanction (40kW)"],
    description: "Ready-to-occupy dark store facility located in central Andheri East pin code 400069.",
    image_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Grade-A Logistics Hub & Fulfillment Center",
    space_type: "Warehouse",
    city: "Bengaluru",
    pincode: "560066",
    locality: "Whitefield Industrial Area",
    area_sqft: 25000,
    price_per_sqft: 42.00,
    monthly_rent: 1050000.00,
    listing_type: "Lease",
    is_verified: true,
    verification_badge: "COREAL Verified 100%",
    features: ["FM2 Flooring", "Dock Levelers (6 Bays)", "Fire Sprinkler System"],
    description: "State-of-the-art PEB warehouse in Whitefield Bengaluru. 32 ft clear height.",
    image_url: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Corporate Office Suite - Cyber City Phase 2",
    space_type: "Commercial Office",
    city: "Gurugram",
    pincode: "122002",
    locality: "DLF Cyber City",
    area_sqft: 12500,
    price_per_sqft: 145.00,
    monthly_rent: 1812500.00,
    listing_type: "Lease",
    is_verified: true,
    verification_badge: "COREAL Verified 100%",
    features: ["Fully Furnished 140 Seats", "LEED Gold Certified", "100% Power Backup"],
    description: "Grade-A office floor in DLF Cyber City Gurugram.",
    image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
  }
];

export const fetchProperties = async (params = {}) => {
  try {
    const response = await apiClient.get('/properties/', { params });
    return response.data;
  } catch (error) {
    console.warn("Django API unreachable, using cached dataset:", error);
    let results = [...FALLBACK_PROPERTIES];
    if (params.q) {
      const q = params.q.toLowerCase();
      results = results.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.pincode.includes(q) || 
        p.locality.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q)
      );
    }
    return results;
  }
};

export const fetchSolutions = async () => {
  try {
    const response = await apiClient.get('/solutions/');
    return response.data;
  } catch (error) {
    return [
      { id: 1, name: "Dark Stores", slug: "dark-stores", icon: "Zap", description: "Bulk dark-store deals across the pan-India network." },
      { id: 2, name: "Warehouses", slug: "warehouses", icon: "Warehouse", description: "From last-mile units to large-format distribution centers." },
      { id: 3, name: "Commercial & Offices", slug: "commercial-spaces", icon: "Building2", description: "Offices, Corporate campuses and service centers, Pin-code-wise." },
      { id: 4, name: "Bank Branches & ATMs", slug: "bank-branches", icon: "Landmark", description: "Branch, ATM and vault networks — Footfall-mapped and compliant." },
      { id: 5, name: "Healthcare & Pharma", slug: "healthcare-pharma", icon: "Activity", description: "Hospitals, Clinics and pharma facilities sited and fitted for compliance." },
      { id: 6, name: "Retail & High-Street", slug: "retail-spaces", icon: "ShoppingBag", description: "High-street, Mall and neighborhood storefronts that convert." },
      { id: 7, name: "Logistics Parks", slug: "logistics-parks", icon: "Truck", description: "Large-format parks and land on the corridors that matter." },
      { id: 8, name: "Cold Storage", slug: "cold-storage", icon: "Snowflake", description: "Temperature-controlled storage that keeps the chain unbroken." },
    ];
  }
};

export const fetchIndustries = async () => {
  try {
    const response = await apiClient.get('/industries/');
    return response.data;
  } catch (error) {
    return [];
  }
};

export const fetchMetrics = async () => {
  try {
    const response = await apiClient.get('/metrics/');
    return response.data;
  } catch (error) {
    return [
      { key: "states", value: "28", label: "States", subtext: "+8 Union Territories" },
      { key: "cities", value: "750+", label: "Cities", subtext: "Across Tier 1-4" },
      { key: "pincodes", value: "11K+", label: "PIN Codes", subtext: "Mapped & Serviceable" },
      { key: "areas", value: "65K+", label: "Areas", subtext: "Across India" },
      { key: "partners", value: "175K+", label: "Associate Partners", subtext: "Enrolled nationwide" },
    ];
  }
};

export const fetchFAQs = async (column = null) => {
  try {
    const params = column ? { column } : {};
    const response = await apiClient.get('/faqs/', { params });
    return response.data;
  } catch (error) {
    return [];
  }
};

export const submitInquiry = async (inquiryData) => {
  try {
    const response = await apiClient.post('/inquiries/', inquiryData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    // Network offline fallback
    console.warn("Submitted offline:", inquiryData);
    return { status: "success", data: inquiryData };
  }
};

export const loginPartner = async (username, password) => {
  try {
    const response = await apiClient.post('/auth/login/', { username, password });
    if (response.data.token) {
      localStorage.setItem('coreal_auth_token', response.data.token);
      localStorage.setItem('coreal_user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw { message: "Server connection failed. Please ensure the Django backend is running." };
  }
};

export const registerPartner = async (formData) => {
  try {
    const response = await apiClient.post('/auth/register/', formData);
    if (response.data.token) {
      localStorage.setItem('coreal_auth_token', response.data.token);
      localStorage.setItem('coreal_user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw { message: "Registration failed. Please check your details." };
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get('/auth/user/');
    return response.data;
  } catch (error) {
    return null;
  }
};

export const logoutPartner = async () => {
  try {
    await apiClient.post('/auth/logout/');
  } catch (error) {
    // Continue with client side logout
  } finally {
    localStorage.removeItem('coreal_auth_token');
    localStorage.removeItem('coreal_user');
  }
};

export default apiClient;
