import client from '../utils/api-client';

export default function emailBuilder() {
    const endpoint = "https://emailbuilder.test/api/apsonex-email-builder";

    return {
        domain: 'emailbuilder.test',

        cache: {
            enable: true,

            ttl: '1s', // use 60S -> 60 seconds, 60M -> 60 minutes, 60H -> 60 hours, 60D -> 60 days.
        },

        debug: false,

        fake: true,

        fakeDelay: 5,

        endpoint: endpoint,

        actions: {
            goBack: {
                action: async () => {
                    window.location.href = "https://google.com";
                }
            },
            onBroadcastAction: {
                previewType: 'webp',
                btnLabel: 'Configure Broadcast',
                action: async ({ emailTemplateId, subject, html, imagePreview, imageMime }) => {
                    //
                }
            },
        },
        initializeConfig: {
            index: async ({ queryString }) => {
                const res = await client().get(`${endpoint}/initialize-config?` + (queryString || ''));
                return res.data;
            }
        },
        assets: {
            // url: assetsUrl,
            // manifest: {
            //     show: async () => {
            //         const res = await client().get(`${endpoint}/assets/url-manifest`);
            //         return res.data;
            //     }
            // },
            font: {
                index: async ({ perPage, page, query }) => {
                    const res = await client().get(`${endpoint}/fonts?perPage=${perPage}&page=${page}&query=${query}`);
                    return {
                        fonts: res && res.data && res.data.status === 'success' ? res.data.data : [],
                    }
                },
                show: async () => {
                    //         const { data } = await client().get(serverPath + `/fonts`, queryObj && queryObj.keyword ? { params: queryObj } : {});
                    //         return data?.fonts || [];
                },
            }
        },
        prebuilt: {
            subjects: {
                industries: {
                    multi: false,

                    // Show available list of industries for subjects
                    index: async () => {
                        try {
                            const res = await client().get(`${endpoint}/prebuilt/subjects/industries`);
                            return res.data;
                        } catch (error) {
                            return {};
                        }
                    },
                    // If industry is choosen, get subjects availble under that industry
                    show: async ({ industry }) => {
                        try {
                            const res = await client().get(`${endpoint}/prebuilt/subjects/industries/${industry}`);
                            if (res && res.data.status === 'success') return res.data;
                            return null;
                        } catch (error) {
                            return [];
                        }
                    },
                },
            },
            blocks: {
                categories: {
                    // List of block categories. e.g. Hero, Newsletter, Footer etc.
                    index: async () => {
                        try {
                            // prettier-ignore
                            const res = await client().get(`${endpoint}/prebuilt/blocks/categories`);
                            return res.data;
                        } catch (error) {
                            console.log(error);
                            return [];
                        }
                    },
                    // Get prebuilt blocks under specified category. E.g. get blocks avaible under `hero` category
                    show: async ({ category }) => {
                        try {
                            // prettier-ignore
                            const res = await client().get(`${endpoint}/prebuilt/blocks/categories/${category}`);
                            return res.data;
                        } catch (error) {
                            return [];
                        }
                    },
                },
            },
            emails: {
                industries: {
                    // Show available list of industries for email configs
                    index: async () => {
                        const res = await client().get(
                            `${endpoint}/prebuilt/emails/industries`
                        );
                        return res.data;
                    },
                    // Get list of available email types in specified industry
                    emailTypes: async ({ industry }) => {
                        const res = await client().get(
                            `${endpoint}/prebuilt/emails/industries/${industry}/email-types`
                        );
                        return res.data;
                    },
                    // Get email configs in specified industry & type
                    configs: async ({ industry, type }) => {
                        const res = await client().get(
                            `${endpoint}/prebuilt/emails/industries/${industry}/email-types/${type}`
                        );
                        return res.data;
                    },
                },
            },
        },
        ai: {
            subjects: {
                create: {
                    url: `${endpoint}/ai/subjects`,
                    onBeforeRequest: ({ headers, body }) => {
                        // Modify headers or body before request
                        return { headers, body }
                    },
                },
            },
            blocks: {
                create: {
                    url: `${endpoint}/ai/blocks`,

                    onBeforeRequest: ({ headers, body }) => {
                        // Modify headers or body before request
                        return { headers, body }
                    },
                },
            },
            emails: {
                create: {
                    url: `${endpoint}/ai/emails`,
                    onBeforeRequest: ({ headers, body }) => {
                        // Modify headers or body before request
                        return { headers, body }
                    },
                },
            },
        },
        blockTemplates: {
            index: async ({ queryString }) => {
                try {
                    const res = await client().get(`${endpoint}/block-templates?` + queryString);
                    return res.data;
                } catch (err) {
                    return [];
                }
            },
            show: async ({ id }) => {
                try {
                    const res = await client().get(`${endpoint}/block-templates/${id}`);
                    return res.data;
                } catch (err) {
                    return [];
                }
            },
            store: async ({ label, category, image, type, config }) => {
                try {
                    const res = await client().post(`${endpoint}/block-templates`, {
                        label,
                        category,
                        image,
                        type,
                        config
                    });
                    return res.data;
                } catch (err) {
                    console.log(err);
                    return [];
                }
            },
            update: async ({ id, label, category, image }) => {
                try {
                    const res = await client().put(`${endpoint}/block-templates/${id}`, { label, category, image });
                    return res.data;
                } catch (err) {
                    return [];
                }
            },
            destroy: async ({ id }) => {
                try {
                    const res = await client().delete(`${endpoint}/block-templates/${id}`);
                    return res.data;
                } catch (err) {
                    console.log(err);
                    return [];
                }
            },
        },
        emailTemplates: {
            show: async ({ id }) => {
                try {
                    const res = await client().get(`${endpoint}/email-templates/${id}`);
                    return res.data;
                } catch (err) {
                    console.log(err);
                    return [];
                }
            },
            store: async ({ subject, emailConfig }) => {
                try {
                    const res = await client().post(`${endpoint}/email-templates`, { subject, emailConfig });
                    return res.data;
                } catch (err) {
                    return [];
                }
            },
            update: async ({ id, subject, emailConfig }) => {
                try {
                    const res = await client().put(`${endpoint}/email-templates/${id}`, { id, subject, emailConfig });
                    return res.data;
                } catch (err) {
                    return [];
                }
            },
            destroy: async ({ id }) => {
                try {
                    const res = await client().delete(`${endpoint}/email-templates/${id}`);
                    return res.data;
                } catch (err) {
                    return [];
                }
            },
        },
        media: {
            index: async ({ queryString }) => {
                try {
                    const res = await client().get(`${endpoint}/media?` + queryString);
                    return res.data;
                } catch (_) {
                    return [];
                }
            },
            store: async ({ formData }) => {
                try {
                    const res = await client().post(`${endpoint}/media`, formData, {
                        'Content-Type': 'multipart/form-data'
                    });
                    return res.data;
                } catch (error) {
                    return [];
                }
            },
            destroy: async ({ id }) => {
                try {
                    const res = await client().delete(`${endpoint}/media/${id}`);
                    return res.data;
                } catch (error) {
                    return [];
                }
            }
        },
        events: {
            listeners: {
                ai: {
                    onSubjectCreated: ({ finishReason, inputTokens, outputTokens, totalTokens }) => {
                        console.log('onSubjectCreated ---');
                        console.log(finishReason, inputTokens, outputTokens, totalTokens);
                    },
                    onBlockCreated: ({ finishReason, inputTokens, outputTokens, totalTokens }) => {
                        console.log('onBlockCreated ---');
                        console.log(finishReason, inputTokens, outputTokens, totalTokens);
                    },
                    onEmailCreated: ({ finishReason, inputTokens, outputTokens, totalTokens }) => {
                        console.log('onEmailCreated ---');
                        console.log(finishReason, inputTokens, outputTokens, totalTokens);
                    },
                }
            }
        }
    };
}
