Feature: Sorting Items on SauceDemo

Background:
    Given the user is on the SauceDemo website
    When the user logs in with valid credentials user 'standard_user' and 'secret_sauce'

Scenario: Verify Sorting by Name
    When the user sorts the items by Name 'A' -> 'Z'
    Then the items should be sorted by Name (A -> Z)

    When the user changes the sorting to Name 'Z' -> 'A'
    Then the items should be sorted by Name (Z -> A)

Scenario: Verify Sorting by Price
    When the user changes the sorting to price 'low' -> 'high'
    Then the order should be sorted by price (low -> high)

    When the user changes the items to price 'high' -> 'low'
    Then the order items be sorted by price (high -> low)