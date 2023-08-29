# sassap

[![Make sure readme doesnt say stripe](https://github.com/twny/booker/actions/workflows/test.yml/badge.svg)](https://github.com/twny/booker/actions/workflows/test.yml)

### Stripe Tests

[Stripes Test Docu](https://stripe.com/docs/testing#international-cards)

Stripe provides a set of test card numbers that you can use to simulate
different scenarios during your testing phase. Using these test cards, you can
test successful transactions, specific error messages, and other edge cases.

#### Common Test Card Numbers
**Visa**: `4242 4242 4242 4242`
**Mastercard**: `5555 5555 5555 4444`
**American** `Express: 3782 822463 10005`
**Discover**: `6011 1111 1111 1117`

Note: For any of the above cards, you can use any future date for the
expiration, any three-digit CVC code, and any valid ZIP code.

#### Testing Different Scenarios
Stripe provides various card numbers for testing different scenarios, such as
declined cards, cards requiring authentication, etc. Here are a few:

**Always Declined**: `4000 0000 0000 0002`
**Requires Authentication**: `4000 0000 0000 3220`
**Insufficient Funds**: `4000 0000 0000 9995`

