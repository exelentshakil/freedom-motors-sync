hi freedom motors team,

built a live working demo for your migration rather than just pitching: https://freedom-motors-sync.vercel.app

answers to your screening questions:

1. live production next.js app router:
i led engineering for the legiit command center ($1m arr, 1m+ marketplace orders, next.js app router + supabase + server actions). for your specific wheelchair van inventory, test the live prototype linked above with real openai + gemini spec enrichment and ftp sync diffing.

2. sanity modeling strategy (sync vs editorial):
isolate documents into two distinct fieldsets: 'sync' and 'editorial'. the daily ftp excel cron runs atomic client.patch(vin).set() mutations strictly targeting the sync attributes (price, mileage, status), while human editorial fields (headlines, custom copy) live in the editorial fieldset with programmatic readOnly rules so the automated feed can never clobber hand edits.

3. content updates without redeploying:
configure a sanity publish webhook hitting next.js /api/revalidate. the handler validates a shared secret and invokes revalidateTag(`vdp-${slug}`), purging vercel edge cache tags in ~42ms globally with zero site rebuilds or ci/cd drag.

quick video intro from my side: https://youtube.com/shorts/kK3XZd5PNOk

estimate and technical prd are ready in the repo. happy to hop on a quick call or walk through the sync pipeline whenever you are free.

shakil
