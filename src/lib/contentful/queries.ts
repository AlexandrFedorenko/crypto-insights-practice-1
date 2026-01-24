import { gql } from 'graphql-request';

export const PAGE_QUERY = gql`
  query GetPage($slug: String!) {
    landingCollection(where: { slug: $slug }, limit: 1) {
      items {
        sys {
          id
        }
        title
        slug
        sectionsCollection(limit: 10) {
          items {
            __typename
            ... on Hero {

              headline
              subheadline
              image {
                url
                width
                height
                description
              }
              ctaText
              ctaUrl
            }
            ... on ContentTypeRichText {
               sys {
                id
              }
              content {
                json
                links {
                  entries {
                    block {
                      sys {
                        id
                      }
                      __typename
                      ... on BlogPost {
                        title
                        slug
                        excerpt
                        coverImage {
                          url
                        }
                      }
                      ... on Landing {
                        title
                        slug
                      }
                    }
                    inline {
                      sys {
                        id
                      }
                      __typename
                      ... on BlogPost {
                        title
                        slug
                      }
                    }
                  }
                  assets {
                    block {
                      sys {
                        id
                      }
                      url
                      title
                      description
                      width
                      height
                      contentType
                    }
                  }
                }
              }
            }
            ... on BlogPost {
               sys {
                id
              }
              title
              slug
              excerpt
              coverImage {
                url
              }
              publishedDate
              views
            }
          }
        }
      }
    }
  }
`;

export const BLOG_POSTS_QUERY = gql`
  query GetBlogPosts {
    blogPostCollection(limit: 10, order: publishedDate_DESC) {
      items {
        sys {
          id
        }
        title
        slug
        publishedDate
        excerpt
        coverImage {
          url
          width
          height
        }
      }
    }
  }
`;

export const BLOG_POST_BY_SLUG_QUERY = gql`
  query GetBlogPostBySlug($slug: String!) {
    blogPostCollection(where: { slug: $slug }, limit: 1) {
      items {
        sys {
            id
        }
        title
        publishedDate
        coverImage {
          url
          width
          height
          description
        }
        content {
          json
          links {
            entries {
              block {
                sys {
                  id
                }
                __typename
                ... on BlogPost {
                  title
                  slug
                  excerpt
                  coverImage {
                    url
                  }
                }
                ... on Landing {
                  title
                  slug
                }
              }
              inline {
                sys {
                  id
                }
                __typename
                ... on BlogPost {
                  title
                  slug
                }
              }
            }
            assets {
              block {
                sys {
                  id
                }
                url
                title
                description
                width
                height
                contentType
              }
            }
          }
        }
      }
    }
  }
`;
