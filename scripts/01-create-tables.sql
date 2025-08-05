-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Companies table
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'closer', 'assistant')),
    company_id UUID NOT NULL REFERENCES companies(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Sellers table
CREATE TABLE sellers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    address TEXT,
    notes TEXT,
    company_id UUID NOT NULL REFERENCES companies(id),
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Buyers table
CREATE TABLE buyers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    address TEXT,
    notes TEXT,
    company_id UUID NOT NULL REFERENCES companies(id),
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Investors table
CREATE TABLE investors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    address TEXT,
    notes TEXT,
    company_id UUID NOT NULL REFERENCES companies(id),
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Quotes table
CREATE TABLE quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deal_id UUID REFERENCES deals(id),
    value NUMERIC NOT NULL,
    variables_json JSONB,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Contracts table
CREATE TABLE contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deal_id UUID NOT NULL REFERENCES deals(id),
    file_url TEXT,
    signed BOOLEAN DEFAULT FALSE,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Deals table (created after quotes and contracts since it references them)
CREATE TABLE deals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID REFERENCES sellers(id),
    buyer_id UUID REFERENCES buyers(id),
    investor_id UUID REFERENCES investors(id),
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'quoted', 'contracted', 'closed')),
    quote_id UUID REFERENCES quotes(id),
    contract_id UUID REFERENCES contracts(id),
    close_date DATE,
    company_id UUID NOT NULL REFERENCES companies(id),
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Calls table
CREATE TABLE calls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    contact_id UUID NOT NULL, -- This will reference buyers, sellers, or investors
    contact_type TEXT NOT NULL CHECK (contact_type IN ('buyer', 'seller', 'investor')),
    recording_url TEXT,
    duration INTEGER DEFAULT 0, -- in seconds
    timestamp TIMESTAMP DEFAULT NOW()
);

-- KPIs table
CREATE TABLE kpis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    type TEXT NOT NULL CHECK (type IN ('calls_made', 'deals_closed', 'quotes_sent', 'contracts_signed')),
    value NUMERIC NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Calendar events table
CREATE TABLE calendar_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    company_id UUID NOT NULL REFERENCES companies(id),
    user_id UUID NOT NULL REFERENCES users(id),
    type TEXT CHECK (type IN ('quote', 'follow-up', 'meeting', 'call')),
    created_at TIMESTAMP DEFAULT NOW()
);
