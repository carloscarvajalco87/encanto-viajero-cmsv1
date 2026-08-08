import type { Schema, Struct } from '@strapi/strapi';

export interface HeroTrustItem extends Struct.ComponentSchema {
  collectionName: 'components_hero_trust_items';
  info: {
    displayName: 'trust-item';
    icon: 'star';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<['shield', 'star', 'users']> &
      Schema.Attribute.DefaultTo<'shield'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MenuNavItem extends Struct.ComponentSchema {
  collectionName: 'components_menu_nav_items';
  info: {
    displayName: 'nav-item';
    icon: 'bulletList';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    submenu: Schema.Attribute.Component<'menu.submenu-item', true>;
  };
}

export interface MenuSubmenuItem extends Struct.ComponentSchema {
  collectionName: 'components_menu_submenu_items';
  info: {
    displayName: 'submenu-item';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'hero.trust-item': HeroTrustItem;
      'menu.nav-item': MenuNavItem;
      'menu.submenu-item': MenuSubmenuItem;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
