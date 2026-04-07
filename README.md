# Dealer SIM Distribution Returns — static prototype (Safaricom SUI)

Next.js **static export** UI for the RTC Dealer SIM Distribution Returns journey.

## Styling — [Safaricom SUI](https://sui.safaricom.co.ke/)

Uses the official **`@safaricom/sui`** package (Material UI theme + Safaricom fonts/CSS) as documented on [SUI Storybook](https://sui.safaricom.co.ke/):

- `ThemeProvider` + default `theme` from `@safaricom/sui`
- `@safaricom/sui/style.css` for fonts and base styles
- SUI components where helpful: `InputField`, `DotsStepper`, `SuiDatePicker`, `Alert`
- MUI: `AppBar`, `Button`, `Paper`, `TextField`, `Table`, etc. (themed by SUI)

Next.js is configured with `transpilePackages: ["@safaricom/sui"]` per the SUI README.

Peer dependency note: `.npmrc` sets `legacy-peer-deps=true` because `@safaricom/sui@1.5.1` declares `react-dom@^18` while this app uses React 19.

## Run locally

```bash
cd /home/winston/dealer-sim-returns-prototype
npm install
npm run dev
```

## Static build

```bash
npm run build
```

Output: `out/` (deploy to any static host).

## Copy into `sim-dealership` workspace

If that folder is owned by root, fix ownership then sync (excluding `node_modules`):

```bash
sudo chown -R "$USER:$USER" /path/to/sim-dealership
rsync -a --exclude node_modules --exclude .next --exclude out /home/winston/dealer-sim-returns-prototype/ /path/to/sim-dealership/
cd /path/to/sim-dealership && npm install && npm run build
```

Or archive:

```bash
tar -czvf ~/dealer-sim-sui-prototype.tgz -C /home/winston/dealer-sim-returns-prototype \
  --exclude=node_modules --exclude=.next --exclude=out .
```

## Prototype data

- Valid serials: **894000000000000** – **894000000000099**
- Resellers: **RS-1001**, **RS-2044**, **RS-3312**
- IPRS mock: national ID with **≥5 digits** passes
# safsim
