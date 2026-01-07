export function ShoppingCart() {
  return (
    <div className="shopping-cart">
      <form target="paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post">
        <input type="hidden" name="cmd" value="_cart" />
        <input type="hidden" name="business" value="ENZQAZKCSU7MA" />
        <input type="hidden" name="display" value="1" />
        <button name="submit" aria-label="View Cart">
          <i className="fa fa-shopping-cart"></i>
        </button>
      </form>
    </div>
  )
}
