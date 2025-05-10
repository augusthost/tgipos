<?php
 return [
  'name' => 'table',
  'label' => 'Table',
  'info' => 'Tables',
  'type' => 'collection',
  'fields' => [
    0 => [
      'name' => 'table_number',
      'type' => 'number',
      'label' => 'Table Number',
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
    1 => [
      'name' => 'seats',
      'type' => 'number',
      'label' => 'Seats',
      'info' => '',
      'group' => '',
      'i18n' => false,
      'required' => true,
      'multiple' => false,
      'meta' => [
      ],
      'opts' => [
        'readonly' => false,
        'placeholder' => NULL,
        'min' => NULL,
        'max' => NULL,
        'step' => NULL,
      ],
    ],
    2 => [
      'name' => 'location',
      'type' => 'text',
      'label' => 'Location',
      'info' => '',
      'group' => '',
      'i18n' => false,
      'required' => false,
      'multiple' => false,
      'meta' => [
      ],
      'opts' => [
        'multiline' => false,
        'showCount' => true,
        'readonly' => false,
        'placeholder' => NULL,
        'minlength' => NULL,
        'maxlength' => NULL,
        'list' => NULL,
      ],
    ],
    3 => [
      'name' => 'status',
      'type' => 'select',
      'label' => 'Status',
      'info' => '',
      'group' => '',
      'i18n' => false,
      'required' => true,
      'multiple' => false,
      'meta' => [
      ],
      'opts' => [
        'options' => [
          0 => 'available',
          1 => 'occupied',
          2 => 'reserved',
        ],
        'multiple' => false,
      ],
    ],
    4 => [
      'name' => 'order',
      'type' => 'contentItemLink',
      'label' => 'Active Order',
      'info' => '',
      'group' => '',
      'i18n' => false,
      'required' => false,
      'multiple' => false,
      'meta' => [
      ],
      'opts' => [
        'link' => 'order',
        'filter' => NULL,
        'display' => '${data.total_number} | ${data.status}',
      ],
    ],
  ],
  'preview' => [
  ],
  'group' => '',
  'meta' => NULL,
  '_created' => 1741165964,
  '_modified' => 1742125553,
  'color' => '#00ffb3',
  'revisions' => false,
  'icon' => 'system:assets/icon-sets/Business/archive-drawer-line.svg',
];