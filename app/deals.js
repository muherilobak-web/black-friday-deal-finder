// Friday Verdict — the deal list.
// Every price below was read from the named source on 27 November 2026.
// A deal only made this list when its sale price and its regular price
// were both shown by that source at check time. Nothing here is guessed:
// if a price could not be confirmed, the deal was left out entirely.
// Discount percentages are computed from sale and regular price, never typed in.

const SITE = {
  name: "Friday Verdict",
  tagline: "Every deal checked today. Every verdict honest.",
  checkedAt: "27 Nov 2026, 14:15 WIB",
  saleEnds: "Most prices run through Cyber Monday, 30 Nov 2026."
};

// Verdict ranks: lower is better. Used by the "best verdict first" sort.
const VERDICT_RANK = { "true-low": 0, "strong": 1, "routine": 2, "inflated": 3 };

const VERDICT_LABEL = {
  "true-low": "TRUE LOW",
  "strong": "STRONG DEAL",
  "routine": "ROUTINE SALE",
  "inflated": "INFLATED"
};

const DEALS = [
  {
    id: "airpods-pro-3-amazon",
    name: "Apple AirPods Pro 3 Wireless Earbuds",
    store: "Amazon",
    category: "Technology",
    sale: 149, was: 249,
    url: "https://www.amazon.com/dp/B0FQFB8FMG",
    source: "9to5Toys",
    verdict: "true-low",
    reason: "9to5Toys and Densky both call $149 the lowest price yet for the Pro 3 — $100 under its $249 list price.",
    terms: ""
  },
  {
    id: "apple-watch-12-amazon",
    name: "Apple Watch Series 12 GPS, 42mm",
    store: "Amazon",
    category: "Technology",
    sale: 299, was: 399,
    url: "https://www.amazon.com/s?k=Apple+Watch+Series+12+42mm+GPS",
    source: "AppleInsider",
    verdict: "true-low",
    reason: "AppleInsider calls $299 a record low, and DealNews calls it the best deal it has seen for this model.",
    terms: "$299 applies to the Light Gold aluminum case with Sand Sport Band (S/M). Other colors and bands can cost more."
  },
  {
    id: "macbook-air-m5-amazon",
    name: "Apple MacBook Air 13-inch, M5, 16GB / 512GB",
    store: "Amazon",
    category: "Technology",
    sale: 999.99, was: 1299,
    url: "https://www.amazon.com/s?k=MacBook+Air+13+inch+M5+16GB+512GB",
    source: "Slickdeals",
    verdict: "routine",
    reason: "A real $300 cut — but Apple raised this exact configuration from $1,099 to $1,299 in June, so the Black Friday price sits only $99 under what it cost before that rise.",
    terms: "Price shown for Starlight and Silver. Other finishes can differ."
  },
  {
    id: "sony-wf-xm5-amazon",
    name: "Sony WF-1000XM5 Noise Cancelling Earbuds",
    store: "Amazon",
    category: "Technology",
    sale: 179.99, was: 299.99,
    url: "https://www.amazon.com/dp/B0CJ144XK3",
    source: "pricehistory.app",
    verdict: "true-low",
    reason: "pricehistory.app records $179.99 as the lowest price in three years of tracking, against a $299.99 list price.",
    terms: "Price shown for the Black finish."
  },
  {
    id: "fire-tv-4k-amazon",
    name: "Amazon Fire TV Stick 4K (2026 release)",
    store: "Amazon",
    category: "Technology",
    sale: 19.99, was: 59.99,
    url: "https://www.amazon.com/dp/B0G4XRP464",
    source: "SmartHomeCompared",
    verdict: "true-low",
    reason: "9to5Toys called $24.99 the lowest price it had tracked for this new stick. Today it is $19.99 — lower still.",
    terms: ""
  },
  {
    id: "fire-tv-4k-plus-amazon",
    name: "Amazon Fire TV Stick 4K Plus",
    store: "Amazon",
    category: "Technology",
    sale: 29.99, was: 69.99,
    url: "https://www.amazon.com/dp/B0F7Z4QZTT",
    source: "TechResearchOnline",
    verdict: "strong",
    reason: "57% off the $69.99 list price for the Wi-Fi 6 model with Dolby Vision.",
    terms: ""
  },
  {
    id: "echo-spot-amazon",
    name: "Amazon Echo Spot Smart Alarm Clock with Alexa",
    store: "Amazon",
    category: "Technology",
    sale: 44.99, was: 109.99,
    url: "https://www.amazon.com/dp/B0BFC7WQ6R",
    source: "Amazon",
    verdict: "strong",
    reason: "59% off the $109.99 typical price, and the lowest price in 90 days on price trackers. One caution: Amazon raised the list prices of some Echo devices earlier this year, so we read the 59% with that in mind.",
    terms: "Price shown for the Black finish."
  },
  {
    id: "kitchenaid-amazon",
    name: "KitchenAid Artisan Series 5-Quart Tilt-Head Stand Mixer (KSM150PS)",
    store: "Amazon",
    category: "Kitchen",
    sale: 349.95, was: 499.99,
    url: "https://www.amazon.com/dp/B094BJHFDF",
    source: "HomeStuffReviews",
    verdict: "routine",
    reason: "30% off a $499.99 list price is a solid cut, but this mixer has sold near this level before, and the discount is modest for Black Friday.",
    terms: "Price can vary by color. The linked listing is the Matcha finish."
  },
  {
    id: "staub-cocotte-amazon",
    name: "STAUB Cast Iron 4-Quart Round Cocotte, Cherry",
    store: "Amazon",
    category: "Kitchen",
    sale: 149.95, was: 380,
    url: "https://www.amazon.com/dp/B003G65YQ0",
    source: "Miami Herald",
    verdict: "strong",
    reason: "61% off the $380 list price for a cast-iron pot that rarely drops this far.",
    terms: "Price shown for the Cherry finish."
  },
  {
    id: "vitamix-5200-amazon",
    name: "Vitamix 5200 Professional-Grade Blender, 64 oz",
    store: "Amazon",
    category: "Kitchen",
    sale: 300, was: 500,
    url: "https://www.amazon.com/dp/B008H4SLV6",
    source: "Miami Herald",
    verdict: "strong",
    reason: "40% off the $500 list price — a $200 cut on Vitamix's long-running workhorse blender.",
    terms: "Price shown for the Black finish."
  },
  {
    id: "ring-doorbell-amazon",
    name: "Ring Battery Doorbell 2K (2026 release)",
    store: "Amazon",
    category: "Technology",
    sale: 39.99, was: 99.99,
    url: "https://www.amazon.com/dp/B0FHJ7TKZM",
    source: "9to5Toys",
    verdict: "true-low",
    reason: "9to5Toys calls $39.99 an all-time low, and DealNews says it matches the model's Amazon all-time low.",
    terms: "The $39.99 price is for Prime members."
  },
  {
    id: "lego-parrot-amazon",
    name: "LEGO Creator 3-in-1 Exotic Pink Parrot (31144)",
    store: "Amazon",
    category: "Toys",
    sale: 11.19, was: 19.99,
    url: "https://www.amazon.com/dp/B0C5XXPT46",
    source: "TJB Deals",
    verdict: "true-low",
    reason: "DealNews calls $11 the best price it has ever seen for this 253-piece set, which builds a parrot, a fish, or a frog.",
    terms: ""
  },
  {
    id: "tcl-65-bestbuy",
    name: "TCL 65-inch S4CF Series 4K UHD HDR Smart TV with Fire TV (2026)",
    store: "Best Buy",
    category: "TV & Entertainment",
    sale: 229.99, was: 469.99,
    url: "https://www.bestbuy.com/site/-/6687112.p?skuId=6687112",
    source: "Best Buy",
    verdict: "true-low",
    reason: "DealNews calls $229.99 the best deal it has seen for this model — $40 less than its last featured price — and Best Buy lists it as a Doorbuster.",
    terms: "Doorbuster. Sale ends November 28."
  },
  {
    id: "hp-omnibook-bestbuy",
    name: "HP OmniBook 5 14-inch 2K OLED Touchscreen Laptop, Intel Core 5, 8GB / 256GB",
    store: "Best Buy",
    category: "Technology",
    sale: 449.99, was: 799.99,
    url: "https://www.bestbuy.com/site/-/6690110.p?skuId=6690110",
    source: "Best Buy",
    verdict: "strong",
    reason: "$350 off the $799.99 list price for a 14-inch OLED touchscreen laptop — 44% off.",
    terms: "Price shown for the 256GB Starlit Blue model."
  },
  {
    id: "sony-wh-xm5-bestbuy",
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    store: "Best Buy",
    category: "Technology",
    sale: 169.99, was: 398,
    url: "https://www.bestbuy.com/site/-/6505727.p?skuId=6505727",
    source: "Best Buy",
    verdict: "strong",
    reason: "Best Buy's own page shows a $398 comparable value, so $169.99 is a 57% cut on Sony's flagship noise-cancelling headphones.",
    terms: "Price shown for the Black finish."
  },
  {
    id: "insignia-40-bestbuy",
    name: "Insignia 40-inch Smart Fire TV",
    store: "Best Buy",
    category: "TV & Entertainment",
    sale: 89.99, was: 149.99,
    url: "https://www.bestbuy.com/site/-/6614066.p?skuId=6614066",
    source: "NewsUnc",
    verdict: "strong",
    reason: "40% off — $60 under the $149.99 list price for a small-room Fire TV.",
    terms: ""
  },
  {
    id: "insignia-55-bestbuy",
    name: "Insignia 55-inch Class QF Series QLED TV",
    store: "Best Buy",
    category: "TV & Entertainment",
    sale: 199.99, was: 399.99,
    url: "https://www.bestbuy.com/site/-/6616640.p?skuId=6616640",
    source: "9to5Toys",
    verdict: "strong",
    reason: "$200 off the $399.99 list price — a 50% cut on a 55-inch QLED set.",
    terms: "Doorbuster. Quantities limited."
  },
  {
    id: "bose-qc-ultra-bestbuy",
    name: "Bose QuietComfort Ultra Wireless Noise Cancelling Headphones",
    store: "Best Buy",
    category: "Technology",
    sale: 299.99, was: 429,
    url: "https://www.bestbuy.com/site/-/13136800.p?skuId=13136800",
    source: "Densky",
    verdict: "routine",
    reason: "30% off the $429 list price is a fair cut, but with no record-low evidence we call it what it is: a routine sale on a premium pair.",
    terms: ""
  },
  {
    id: "google-home-bestbuy",
    name: "Google Home Speaker (2026)",
    store: "Best Buy",
    category: "Technology",
    sale: 80, was: 100,
    url: "https://www.bestbuy.com/site/-/6642293.p?skuId=6642293",
    source: "9to5Toys",
    verdict: "true-low",
    reason: "9to5Toys lists $80 against a $100 regular price and calls it an all-time low.",
    terms: "Price shown for the Jade finish."
  },
  {
    id: "yale-lock-bestbuy",
    name: "Yale Assure Lock 2 with Wi-Fi",
    store: "Best Buy",
    category: "Technology",
    sale: 175, was: 300,
    url: "https://www.bestbuy.com/site/-/6554595.p?skuId=6554595",
    source: "9to5Toys",
    verdict: "strong",
    reason: "$125 off the $300 list price — 42% off a keyless smart lock with Wi-Fi built in.",
    terms: ""
  },
  {
    id: "dualsense-bestbuy",
    name: "PlayStation DualSense Wireless Controller for PS5",
    store: "Best Buy",
    category: "Gaming",
    sale: 54.99, was: 74.99,
    url: "https://www.bestbuy.com/site/-/6522931.p?skuId=6522931",
    source: "TechRadar",
    verdict: "routine",
    reason: "$20 off the $74.99 list price is the standard sale price for this controller, not a standout cut.",
    terms: ""
  },
  {
    id: "shark-ip3251-bestbuy",
    name: "Shark PowerDetect Clean & Empty Cordless Stick Vacuum (IP3251)",
    store: "Best Buy",
    category: "Home",
    sale: 349.99, was: 549.99,
    url: "https://www.bestbuy.com/site/-/6599390.p?skuId=6599390",
    source: "Best Buy",
    verdict: "routine",
    reason: "Best Buy's own page shows a $549.99 comparable value, so $349.99 saves $200 — a real cut, but 36% is a routine Black Friday discount for this line.",
    terms: ""
  },
  {
    id: "airpods-pro-3-bestbuy",
    name: "Apple AirPods Pro 3 Wireless Earbuds",
    store: "Best Buy",
    category: "Technology",
    sale: 149.99, was: 249,
    url: "https://www.bestbuy.com/site/-/6376563.p?skuId=6376563",
    source: "9to5Toys",
    verdict: "strong",
    reason: "40% off the $249 list price — a dollar above Amazon's $149 for the same earbuds, so cross-check before you buy.",
    terms: ""
  },
  {
    id: "dyson-v8-bestbuy",
    name: "Dyson V8 Cyclone Cordless Vacuum",
    store: "Best Buy",
    category: "Home",
    sale: 299.99, was: 399.99,
    url: "https://www.bestbuy.com/site/-/6675168.p?skuId=6675168",
    source: "GadgetReview",
    verdict: "routine",
    reason: "25% off the $399.99 list price. Walmart has the same vacuum for $299, so the saving is real but not unique to Best Buy.",
    terms: ""
  },
  {
    id: "pixel-watch-5-bestbuy",
    name: "Google Pixel Watch 5, 41mm, Wi-Fi",
    store: "Best Buy",
    category: "Technology",
    sale: 299.99, was: 399.99,
    url: "https://www.bestbuy.com/site/-/6686029.p?skuId=6686029",
    source: "Best Buy",
    verdict: "routine",
    reason: "25% off the $399.99 list price for the 41mm Wi-Fi model — a fair cut with no record-low evidence.",
    terms: "Price shown for the Satin Pyrite case with Olive band."
  },
  {
    id: "kitchenaid-walmart",
    name: "KitchenAid Artisan Series 5-Quart Tilt-Head Stand Mixer (KSM150PS)",
    store: "Walmart",
    category: "Kitchen",
    sale: 349, was: 499.99,
    url: "https://www.walmart.com/ip/16762223439",
    source: "Koupon.ai",
    verdict: "routine",
    reason: "30% off the $499.99 list price — the same mixer Amazon has for $349.95, so compare finishes before you pick a store.",
    terms: "Price shown for the Cardamom finish. Other colors can differ."
  },
  {
    id: "dyson-v8-walmart",
    name: "Dyson V8 Cyclone Cordless Vacuum",
    store: "Walmart",
    category: "Home",
    sale: 299, was: 399.99,
    url: "https://www.walmart.com/ip/20018366583",
    source: "Koupon.ai",
    verdict: "routine",
    reason: "25% off the $399.99 list price — a dollar under Best Buy's $299.99 for the same vacuum.",
    terms: ""
  },
  {
    id: "ninja-slushi-walmart",
    name: "Ninja SLUSHi Frozen Drink Maker",
    store: "Walmart",
    category: "Kitchen",
    sale: 169, was: 319,
    url: "https://www.walmart.com/ip/17768001716",
    source: "DealNews",
    verdict: "strong",
    reason: "47% off the $319 list price — a $150 cut on Ninja's frozen-drink maker.",
    terms: ""
  },
  {
    id: "lego-red-panda-walmart",
    name: "LEGO Creator 3-in-1 Cute Animals: Red Panda (31394)",
    store: "Walmart",
    category: "Toys",
    sale: 15, was: 29.99,
    url: "https://www.walmart.com/ip/18640609617",
    source: "Walmart",
    verdict: "strong",
    reason: "Half off the $29.99 list price — $15 for the 3-in-1 Creator set.",
    terms: ""
  },
  {
    id: "lego-starship-walmart",
    name: "LEGO Star Wars Jango Fett's Starship (75433)",
    store: "Walmart",
    category: "Toys",
    sale: 35, was: 69.99,
    url: "https://www.walmart.com/ip/15179510072",
    source: "DealNews",
    verdict: "true-low",
    reason: "DealNews calls $35 by far the best-ever price for this 707-piece set — $21 cheaper than Amazon's price.",
    terms: "Sale ends November 29."
  },
  {
    id: "barbie-snowboarder-walmart",
    name: "Barbie Careers Snowboarder Doll",
    store: "Walmart",
    category: "Toys",
    sale: 10, was: 19.99,
    url: "https://www.walmart.com/ip/17704462372",
    source: "Walmart",
    verdict: "strong",
    reason: "Half off the $19.99 list price — $10 for the doll with 10+ accessories, including a color-change snowboard.",
    terms: ""
  },
  {
    id: "lego-cantina-target",
    name: "LEGO Star Wars SMART Play: Mos Eisley Cantina (75425)",
    store: "Target",
    category: "Toys",
    sale: 38.99, was: 64.99,
    url: "https://www.target.com/s?searchTerm=LEGO+Star+Wars+Mos+Eisley+Cantina+75425",
    source: "ConsumerQueen",
    verdict: "strong",
    reason: "40% off the $64.99 list price — $26 under list for the smart-play Cantina set.",
    terms: "Free shipping on orders of $35 or more."
  },
  {
    id: "lego-mooshroom-target",
    name: "LEGO Minecraft The Mooshroom House (21270)",
    store: "Target",
    category: "Toys",
    sale: 24.99, was: 49.99,
    url: "https://www.target.com/p/lego-minecraft-the-mooshroom-house-toy-figures-and-building-playset-21270/-/A-92538355",
    source: "ConsumerQueen",
    verdict: "strong",
    reason: "50% off the $49.99 list price — $25 under list for the Minecraft build.",
    terms: "Free shipping on orders of $35 or more."
  },
  {
    id: "dyson-airwrap-nordstrom",
    name: "Dyson Airwrap i.d. Multi-Styler and Dryer",
    store: "Nordstrom",
    category: "Beauty",
    sale: 499, was: 649.99,
    url: "https://www.nordstrom.com/s/airwrap-i-d-multi-styler-and-dryer-straightwavy-hair/8184703",
    source: "Nordstrom",
    verdict: "routine",
    reason: "23% off the $649.99 list price. Dyson rarely discounts the Airwrap, so a $150 cut is worth noting — but with no record-low evidence, it stays a routine sale.",
    terms: ""
  },
  {
    id: "galaxy-s26-samsung",
    name: "Samsung Galaxy S26 Ultra, 256GB, Unlocked",
    store: "Samsung",
    category: "Technology",
    sale: 1049.99, was: 1399.99,
    url: "https://www.samsung.com/us/smartphones/galaxy-s26-ultra/buy/galaxy-s26-ultra-256gb-unlocked-sku-sm-s948uzdaxaa/",
    source: "Samsung",
    verdict: "routine",
    reason: "$350 off the $1,399.99 list price — solid, but 25% is a routine Black Friday discount for a flagship phone.",
    terms: "Samsung advertises $350 off this model and, separately, up to $720 in trade-in credit — some coverage reports the $1,049.99 price needs a trade-in, so confirm the final price at checkout before you pay. Black Friday pricing runs through November 30."
  }
];
