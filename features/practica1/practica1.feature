Feature: practica 1

  Scenario: Page elements are loaded correctly
    Given An Empty todo list
    Then I should see the title and footer

  Scenario: I want to add an item
    Given An Empty todo list
    When I add items:
      | primer item |
    Then Todo list contains:
      | primer item |
    And it shows '1 item left'
    And Text box empties

  Scenario: I want to add multiple items
    Given A todo list with items:
      | primer item  |
      | segundo item |
    When I add items:
      | tercer item |
      | cuarto item |
    Then Todo list contains:
      | primer item  |
      | segundo item |
      | tercer item  |
      | cuarto item  |
    And it shows '4 items left'

  Scenario: I want to delete an item
    Given A todo list with items:
      | item a conservar |
      | item a eliminar  |
    When I delete item:
      | item a eliminar |
    Then Todo list contains:
      | item a conservar |
    And it shows '1 item left'

  Scenario: I want to mark as complete an item
    Given A todo list with items:
      | item activo      |
      | item a completar |
    When I complete item:
      | item a completar |
    Then The following item shows as complete:
      | item a completar |

  Scenario: I want to delete completed items
    Given A todo list with items:
      | item a eliminar  |
      | item a eliminar2 |
    When I complete item:
      | item a eliminar  |
      | item a eliminar2 |
    And I delete completed items
    Then Todo list doesnt contain items

  Scenario Outline: I want to filter the todo list
    Given A todo list with items:
      | item activo      |
      | item a completar |
    When I complete item:
      | item a completar |
    And I navigate to '<filter>'
    Then Todo list contains:
      | <item> |

    Examples: 
      | filter    | item             |
      | Active    | item activo      |
      | Completed | item a completar |

  Scenario Outline: I want to filter the todo list by all states
    Given A todo list with items:
      | item activo      |
      | item a completar |
    When I complete item:
      | item a completar |
    And I navigate to 'All'
    Then Todo list contains:
      | item activo      |
      | item a completar |

    Examples: 
      | filter    | item             |
      | Active    | item activo      |
      | Completed | item a completar |

  Scenario: I want to edit an item
    Given A todo list with items:
      | item          |
      | item a editar |
    When I edit 'item a editar' into 'item editado'
    Then Todo list contains:
      | item         |
      | item editado |
