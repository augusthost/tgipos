<?php
 return [
  'name' => 'category',
  'label' => 'Category',
  'info' => 'Category',
  'type' => 'tree',
  'fields' => [
    0 => [
      'name' => 'name',
      'type' => 'text',
      'label' => 'Name',
      'info' => '',
      'group' => '',
      'i18n' => false,
      'required' => true,
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
    1 => [
      'name' => 'description',
      'type' => 'text',
      'label' => 'Description',
      'info' => 'Description',
      'group' => '',
      'i18n' => false,
      'required' => false,
      'multiple' => false,
      'meta' => [
      ],
      'opts' => [
        'multiline' => true,
        'showCount' => true,
        'readonly' => false,
        'placeholder' => NULL,
        'minlength' => NULL,
        'maxlength' => NULL,
        'list' => NULL,
      ],
    ],
    2 => [
      'name' => 'image',
      'type' => 'asset',
      'label' => 'Image',
      'info' => '',
      'group' => '',
      'i18n' => false,
      'required' => false,
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
  '_created' => 1741161064,
  '_modified' => 1742125660,
  'color' => '#00ffb3',
  'revisions' => false,
  'icon' => 'system:assets/icon-sets/Business/links-line.svg',
];