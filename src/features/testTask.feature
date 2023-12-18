Feature: Sorting Items on SauceDemo

Background:
    Given the user is on the SauceDemo website
    When the user logs in with valid credentials user 'standard_user' and 'secret_sauce'

Scenario: Verify Sorting by Name
    When the user sorts the items by Name (A -> Z)
    Then the items should be sorted by Name (A -> Z)

    When the user changes the sorting to Name (Z -> A)
    Then the items should be sorted by Name (Z -> A)
