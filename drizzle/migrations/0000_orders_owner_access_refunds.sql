ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS revoked_at timestamptz;
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders (user_id);
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());