import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "doc",
        label: "Documentation pages",
        path: "src/content",
        format: "mdx",
        ui: {
          router: ({ document }) => {
            const crumbs = document._sys.breadcrumbs;
            const filename = document._sys.filename;
            if (filename === "index") {
              return `/${crumbs.join("/")}`;
            }
            return `/${[...crumbs, filename].join("/")}`;
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "status",
            label: "Status",
            options: [
              { label: "Shipped", value: "shipped" },
              { label: "In progress", value: "in-progress" },
              { label: "Planned", value: "planned" },
            ],
          },
          {
            type: "string",
            name: "version",
            label: "Version",
            description: 'Platform version, e.g. "1.0.0"',
          },
          {
            type: "datetime",
            name: "updated",
            label: "Last updated",
          },
          {
            type: "string",
            name: "figma",
            label: "Figma link",
          },
          {
            type: "string",
            name: "source",
            label: "Source link",
            description: "GitHub or other source-of-truth URL",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Page content",
            isBody: true,
            templates: [
              {
                name: "Callout",
                label: "Callout",
                fields: [
                  {
                    type: "string",
                    name: "tone",
                    label: "Tone",
                    options: [
                      { label: "Info", value: "info" },
                      { label: "Warning", value: "warning" },
                      { label: "Danger", value: "danger" },
                    ],
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                  },
                  {
                    type: "rich-text",
                    name: "children",
                    label: "Content",
                  },
                ],
              },
              {
                name: "RelatedResources",
                label: "Related resources",
                fields: [
                  {
                    type: "object",
                    name: "links",
                    label: "Links",
                    list: true,
                    fields: [
                      { type: "string", name: "title", label: "Title" },
                      { type: "string", name: "href", label: "Path" },
                      {
                        type: "string",
                        name: "description",
                        label: "Description",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
