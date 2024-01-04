Feature: Api test task

Test task for a Senior Automation QA Engineer role

@api-Request
Scenario Outline: Request Api
    Given make a get request to the api: 'https://api.publicapis.org/entries'
    When read the response and find all objects with property '<Category>'   
    When compare, count and verify the number of object where the property Authentication & Authorization
    Then print found object to control
Examples:
    | Category        | 
    | Auth            |  
    | Cors            |  
