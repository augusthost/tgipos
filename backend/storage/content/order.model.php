<?php
 return [
  'name' => 'order',
  'label' => 'Order',
  'info' => 'Order',
  'type' => 'collection',
  'fields' => [
    0 => [
      'name' => 'table',
      'type' => 'contentItemLink',
      'label' => 'Table',
      'info' => 'Table',
      'group' => '',
      'i18n' => false,
      'required' => true,
      'multiple' => false,
      'meta' => [
      ],
      'opts' => [
        'filter' => NULL,
        'link' => 'table',
        'display' => 'No. ${data.table_number}',
      ],
    ],
    1 => [
      'name' => 'customer',
      'type' => 'contentItemLink',
      'label' => 'Customer',
      'info' => 'Customer',
      'group' => '',
      'i18n' => false,
      'required' => false,
      'multiple' => false,
      'meta' => [
      ],
      'opts' => [
        'filter' => NULL,
      ],
    ],
    2 => [
      'name' => 'status',
      'type' => 'select',
      'label' => 'Status',
      'info' => 'Status',
      'group' => '',
      'i18n' => false,
      'required' => true,
      'multiple' => false,
      'meta' => [
      ],
      'opts' => [
        'multiple' => false,
        'options' => [
          0 => 'pending',
          1 => 'completed',
          2 => 'cancelled',
        ],
      ],
    ],
    3 => [
      'name' => 'order_type',
      'type' => 'select',
      'label' => 'Order Type',
      'info' => 'Order Type',
      'group' => '',
      'i18n' => false,
      'required' => true,
      'multiple' => false,
      'meta' => [
      ],
      'opts' => [
        'options' => [
          0 => 'dine-in',
          1 => 'takeaway',
        ],
        'multiple' => false,
      ],
    ],
    4 => [
      'name' => 'total_amount',
      'type' => 'number',
      'label' => 'Total Amount',
      'info' => '',
      'group' => '',
      'i18n' => false,
      'required' => true,
      'multiple' => false,
      'meta' => [
      ],
      'opts' => [
      ],
    ],
  ],
  'preview' => [
  ],
  'group' => '',
  'meta' => NULL,
  '_created' => 1741163075,
  '_modified' => 1742066605,
  'color' => '#00ffb3',
  'revisions' => false,
  'icon' => 'system:assets/icon-sets/Finance/shopping-cart-2-line.svg',
];