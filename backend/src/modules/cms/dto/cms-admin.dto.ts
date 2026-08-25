export class CreateHeroSlideDto {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  image?: string;
  order?: number;
  active?: boolean;
}
export class UpdateHeroSlideDto {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  image?: string;
  order?: number;
  active?: boolean;
}
export class CreateGalleryDto {
  url: string;
  altText?: string;
  caption?: string;
  category?: string;
  order?: number;
  visible?: boolean;
}
export class UpdateGalleryDto {
  url?: string;
  altText?: string;
  caption?: string;
  category?: string;
  order?: number;
  visible?: boolean;
}
export class CreateTestimonialDto {
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
  text: string;
  rating?: number;
  featured?: boolean;
  order?: number;
  active?: boolean;
}
export class UpdateTestimonialDto {
  author?: string;
  role?: string;
  company?: string;
  avatar?: string;
  text?: string;
  rating?: number;
  featured?: boolean;
  order?: number;
  active?: boolean;
}
export class CreateBenefitDto {
  title: string;
  description?: string;
  icon?: string;
  image?: string;
  order?: number;
  active?: boolean;
}
export class UpdateBenefitDto {
  title?: string;
  description?: string;
  icon?: string;
  image?: string;
  order?: number;
  active?: boolean;
}
export class CreateArtisanProcessDto {
  title: string;
  description?: string;
  icon?: string;
  image?: string;
  stepOrder?: number;
  active?: boolean;
}
export class UpdateArtisanProcessDto {
  title?: string;
  description?: string;
  icon?: string;
  image?: string;
  stepOrder?: number;
  active?: boolean;
}
