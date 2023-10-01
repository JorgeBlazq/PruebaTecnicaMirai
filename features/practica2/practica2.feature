Feature: practica 2


  Scenario: I want the default item priority to be medium
    Given An Empty todo list
    When I add items:
      | prioridad media |
    Then Todo list contains:
      | prioridad media | medium |

  Scenario Outline: I want to assign item priority
    Given A todo list with items:
      | primer item | medium |
    When I assign <priority> priority to 'primer item' item
    Then Todo list contains:
      | primer item | <priority> |

    Examples: 
      | priority |
      | low      |
      | medium   |
      | high     |

  Scenario Outline: I want to filter the list by priority
    Given A todo list with items:
      | item baja  | low    |
      | item media | medium |
      | item alta  | high   |
    When I filter by priority <priority>
    Then Todo list contains:
      | <item> |

    Examples: 
      | filter   | item             |
      | active   | item activo      |
      | complete | item a completar |
  
  Scenario: I want to filter the list by any priority
    Given A todo list with items:
      | item baja  | low    |
      | item media | medium |
      | item alta  | high   |
    When I filter by priority 'all'
    Then Todo list contains:
      | item baja  | low    |
      | item media | medium |
      | item alta  | high   |
