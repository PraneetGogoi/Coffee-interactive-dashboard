
-- Create coffee_orders table
CREATE TABLE public.coffee_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT NOT NULL,
  order_date DATE NOT NULL,
  customer_name TEXT NOT NULL,
  country TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(10,4) NOT NULL,
  sales NUMERIC(10,4) NOT NULL,
  coffee_type TEXT NOT NULL,
  roast_type TEXT NOT NULL,
  size NUMERIC(4,2) NOT NULL,
  loyalty_card TEXT NOT NULL DEFAULT 'No',
  year INTEGER NOT NULL,
  month INTEGER NOT NULL,
  month_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.coffee_orders ENABLE ROW LEVEL SECURITY;

-- Allow public read access (dashboard is public)
CREATE POLICY "Anyone can read coffee orders"
  ON public.coffee_orders
  FOR SELECT
  USING (true);

-- Create indexes for common filter columns
CREATE INDEX idx_coffee_orders_year ON public.coffee_orders(year);
CREATE INDEX idx_coffee_orders_coffee_type ON public.coffee_orders(coffee_type);
CREATE INDEX idx_coffee_orders_country ON public.coffee_orders(country);
CREATE INDEX idx_coffee_orders_roast_type ON public.coffee_orders(roast_type);
