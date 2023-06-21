import Link from "next/link";
import Head from "next/head";
import { MdxMeta } from "lib/models/mdx-meta";
import dayjs from "dayjs";
import { TryBanner } from "components/core/try-banner";
import Navbar from "components/core/navbar";
import Footer from "components/core/footer";
import { Contributor } from "components/contributor";
import { ReactNode } from "@mdx-js/react/lib";
import { MDXProvider } from "@mdx-js/react";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";

import type { MDXComponents } from "mdx/types";
const components: MDXComponents = {
  h1: (props) => <Heading as="h1" fontSize={["2xl", "2xl", "32px"]} color="#000" {...props} />,
  h2: (props) => <Text fontWeight="bold" fontSize="xl" mt={12} mb={6} {...props} />,
  p: (props) => <Text my={6} color="#495057" fontSize="16px" lineHeight="24px" {...props} />,
  a: (props) => (
    <Text as="a" href={props.href} rel="noopener noreferrer" color="#6868F7" fontWeight="bold">
      {props.children}
    </Text>
  ),
  ul: (props) => <UnorderedList spacing={4} {...props} />,
  ol: (props) => <OrderedList spacing={4} {...props} />,
  li: (props) => (
    <ListItem
      color="#495057"
      lineHeight="32px"
      fontSize="16px"
      _before={{ content: "unset" }}
      {...props}
    />
  ),
};

export interface MdxLayoutProps {
  meta: MdxMeta;
  children: ReactNode;
  hideLayout?: boolean;
  hideHead?: boolean;
  hideAuthors?: boolean;
  imagePreviewMode?: boolean;
  tags?: string[];
}

export const MdxLayout = (props: MdxLayoutProps) => {
  const title = `${props.meta.title} | June Changelog`;
  const description = "Discover new updates and improvements to June.";
  const url = "https://changelog.june.so";

  if (props.imagePreviewMode) {
    return (
      <Image
        src={props.meta.headerImage}
        alt={props.meta.title}
        height="100%"
        objectFit={"cover"}
      />
    );
  }

  return (
    <MDXProvider components={components}>
      {!props.hideHead && (
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="title" content={title} />
          <meta name="description" content={description} />
          <meta name="image" content={props.meta.headerImage} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={url} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={props.meta.headerImage} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content={url} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={props.meta.headerImage} />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="June Changelog"
            href="https://changelog.june.so/rss.xml"
          />
        </Head>
      )}
      {!props.hideLayout && <Navbar />}
      <Timeline
        selected={!props.hideLayout}
        date={dayjs(props.meta.publishedAt).format("MMM DD YYYY")}
      >
        <Box
          mt={!props.hideLayout && [86, 86, 140]}
          // maxW="4xl"
          // mx="auto"
          width="682px"
          // px={defaultPx(32)}
        >
          {/* Article header */}
          <VStack align="start" spacing={[4, 4, 6]}>
            {props.tags !== undefined && (
              <Flex gap={2}>
                {props.tags?.map((tag, index) => (
                  <Box
                    height="22px"
                    bg="#F1F3F5"
                    color="#0D131B"
                    fontSize="14px"
                    borderRadius="full"
                    px={2}
                    lineHeight="21px"
                    fontWeight={500}
                    position="relative"
                    top="-8px"
                    mb="-10px"
                  >
                    {tag}
                  </Box>
                ))}
              </Flex>
            )}
            <Link href={props.hideLayout ? `/changelogs/${props.meta.slug}` : ""}>
              <Image
                borderRadius="16px"
                src={props.meta.headerImage}
                alt={props.meta.title}
                w="full"
                cursor={props.hideLayout ? "pointer" : "default"}
              />
            </Link>

            <Link href={props.hideLayout ? `/changelogs/${props.meta.slug}` : ""}>
              <Heading
                as="h1"
                fontSize="24px"
                color="#0D131B"
                cursor={props.hideLayout ? "pointer" : "default"}
              >
                {props.meta.title}
              </Heading>
            </Link>
          </VStack>
          {/* Article content */}
          <Box
            // pt={[10]}
            pb={16}
            fontSize="lg"
            lineHeight="32px"
            color="landing.almostBlack.500"
          >
            {props.children}
          </Box>
          {/* Article authors */}
          {!props.hideAuthors && (
            <>
              <Divider mt={16} mb={8} />
              <VStack px={[6]} align="start" spacing={4}>
                {props.meta.authors.map((author) => (
                  <Contributor key={author.name} {...author} />
                ))}
              </VStack>
            </>
          )}
        </Box>
      </Timeline>
      {!props.hideLayout && (
        <>
          <TryBanner _wrapper={{ my: [50, 50, 120] }} />
          <Footer _wrapper={{ mt: [50, 50, 120], mb: 20 }} />
        </>
      )}
    </MDXProvider>
  );
};
