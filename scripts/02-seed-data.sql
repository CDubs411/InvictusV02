-- Insert sample company
INSERT INTO companies (id, name) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Invictus Real Estate');

-- Insert sample users
INSERT INTO users (id, name, email, role, company_id) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'Brendan Martinez', 'brendan@invictusre.com', 'closer', '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440002', 'Sarah Johnson', 'sarah@invictusre.com', 'closer', '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440003', 'Mike Chen', 'mike@invictusre.com', 'assistant', '550e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440004', 'Lisa Rodriguez', 'lisa@invictusre.com', 'admin', '550e8400-e29b-41d4-a716-446655440000');

-- Insert sample buyers
INSERT INTO buyers (id, name, phone, email, address, notes, company_id, created_by) VALUES 
('550e8400-e29b-41d4-a716-446655440010', 'Sarah Johnson', '(555) 123-4567', 'sarah.j@email.com', 'Austin, TX', 'First-time buyer, pre-approved for $350K', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440011', 'Mike Chen', '(555) 987-6543', 'mchen@email.com', 'Dallas, TX', 'Cash buyer, looking for investment properties', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440012', 'Lisa Rodriguez', '(555) 456-7890', 'lisa.r@email.com', 'Houston, TX', 'Relocating from California, urgent timeline', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440002');

-- Insert sample sellers
INSERT INTO sellers (id, name, phone, email, address, notes, company_id, created_by) VALUES 
('550e8400-e29b-41d4-a716-446655440020', 'Robert Martinez', '(555) 234-5678', 'robert.m@email.com', '456 Oak Street, Austin, TX', 'Motivated seller, needs quick close', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440021', 'Patricia Wong', '(555) 876-5432', 'pwong@email.com', '789 Pine Avenue, Dallas, TX', 'Inherited property, selling as-is', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440022', 'James Thompson', '(555) 345-6789', 'j.thompson@email.com', '123 Maple Drive, Houston, TX', 'Distressed property, needs repairs', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001');

-- Insert sample investors
INSERT INTO investors (id, name, phone, email, address, notes, company_id, created_by) VALUES 
('550e8400-e29b-41d4-a716-446655440030', 'Premier Properties LLC', '(555) 987-6543', 'mchen@premierprops.com', 'Austin, TX', 'Cash buyer, quick close, commercial focus', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440031', 'Lone Star Investments', '(555) 456-7890', 'sarah@lonestarinv.com', 'Dallas, TX', 'Residential focus, fix and flip specialist', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440032', 'Capital Growth Partners', '(555) 321-0987', 'dwilson@capitalgrowth.com', 'Houston, TX', 'Large portfolio, wholesale and multi-family', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001');

-- Insert sample quotes
INSERT INTO quotes (id, deal_id, value, variables_json, created_by) VALUES 
('550e8400-e29b-41d4-a716-446655440040', NULL, 285000.00, '{"labor_rate": 75, "material_markup": 0.15, "profit_margin": 0.20}', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440041', NULL, 450000.00, '{"labor_rate": 75, "material_markup": 0.15, "profit_margin": 0.25}', '550e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440042', NULL, 320000.00, '{"labor_rate": 75, "material_markup": 0.15, "profit_margin": 0.18}', '550e8400-e29b-41d4-a716-446655440001');

-- Insert sample contracts
INSERT INTO contracts (id, deal_id, file_url, signed, created_by) VALUES 
('550e8400-e29b-41d4-a716-446655440050', NULL, '/contracts/contract_001.pdf', false, '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440051', NULL, '/contracts/contract_002.pdf', true, '550e8400-e29b-41d4-a716-446655440002');

-- Insert sample deals
INSERT INTO deals (id, seller_id, buyer_id, investor_id, status, quote_id, contract_id, company_id, created_by) VALUES 
('550e8400-e29b-41d4-a716-446655440060', '550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440010', NULL, 'new', NULL, NULL, '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440061', '550e8400-e29b-41d4-a716-446655440021', NULL, '550e8400-e29b-41d4-a716-446655440030', 'quoted', '550e8400-e29b-41d4-a716-446655440041', NULL, '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440062', '550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440012', NULL, 'contracted', '550e8400-e29b-41d4-a716-446655440042', '550e8400-e29b-41d4-a716-446655440050', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001');

-- Update deals to reference quotes and contracts
UPDATE quotes SET deal_id = '550e8400-e29b-41d4-a716-446655440061' WHERE id = '550e8400-e29b-41d4-a716-446655440041';
UPDATE quotes SET deal_id = '550e8400-e29b-41d4-a716-446655440062' WHERE id = '550e8400-e29b-41d4-a716-446655440042';
UPDATE contracts SET deal_id = '550e8400-e29b-41d4-a716-446655440062' WHERE id = '550e8400-e29b-41d4-a716-446655440050';

-- Insert sample calls
INSERT INTO calls (id, user_id, contact_id, contact_type, recording_url, duration, timestamp) VALUES 
('550e8400-e29b-41d4-a716-446655440070', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440010', 'buyer', '/recordings/call_001.mp3', 272, '2024-01-15 14:30:00'),
('550e8400-e29b-41d4-a716-446655440071', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440030', 'investor', NULL, 0, '2024-01-15 13:45:00'),
('550e8400-e29b-41d4-a716-446655440072', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440012', 'buyer', '/recordings/call_003.mp3', 495, '2024-01-15 11:20:00');

-- Insert sample KPIs
INSERT INTO kpis (id, user_id, type, value) VALUES 
('550e8400-e29b-41d4-a716-446655440080', '550e8400-e29b-41d4-a716-446655440001', 'calls_made', 42),
('550e8400-e29b-41d4-a716-446655440081', '550e8400-e29b-41d4-a716-446655440001', 'deals_closed', 3),
('550e8400-e29b-41d4-a716-446655440082', '550e8400-e29b-41d4-a716-446655440001', 'quotes_sent', 12),
('550e8400-e29b-41d4-a716-446655440083', '550e8400-e29b-41d4-a716-446655440002', 'calls_made', 38),
('550e8400-e29b-41d4-a716-446655440084', '550e8400-e29b-41d4-a716-446655440002', 'deals_closed', 2),
('550e8400-e29b-41d4-a716-446655440085', '550e8400-e29b-41d4-a716-446655440002', 'quotes_sent', 10);

-- Insert sample calendar events
INSERT INTO calendar_events (id, title, start_time, end_time, company_id, user_id, type) VALUES 
('550e8400-e29b-41d4-a716-446655440090', 'Property Walkthrough', '2024-01-16 14:00:00', '2024-01-16 15:00:00', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001', 'meeting'),
('550e8400-e29b-41d4-a716-446655440091', 'Contract Review', '2024-01-16 16:30:00', '2024-01-16 17:00:00', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440002', 'call'),
('550e8400-e29b-41d4-a716-446655440092', 'Follow-up Call', '2024-01-17 09:00:00', '2024-01-17 09:30:00', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001', 'follow-up');
