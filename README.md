## Flickering InstantSearch issue (state cache) when using Next 14 with App Router.

Open https://wnwkpc-3000.csb.app/Samsung. Refresh page to be sure that entire page comes from SSR.

Pick 1-2 categories and then change brand. You can change brand few times, as issue might not be easy to catch.

Sometimes you will see flickering effect - old data from cache (from first Sasmung query) will be rendered.

Problem exists only when InstantSearch routing is enabled:
1. After click "brand" link, InstantSearch state is udpated correctly for short time
2. Next.js download rsc payload, route is updated (/{selected_brand}) and InstantSearch state changes to old one (from first rendered page - Samsung)
3. InstantSearch state is udpated correctly

InstantSearch implmention you will find in [./components/search.tsx](./components/search.tsx)

For debugging purposes I log InstantSearch state chagnes. If you open console, you will see that entire state comes from cache soon after URL address changes.

