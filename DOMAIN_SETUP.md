# Connecting Your GoDaddy Domain to Netlify

Since your site is set up for Netlify, the **best and easiest way** to connect your domain (`isamelias.com`) is to use **Netlify DNS**.

## Why is this the best way?
- **Automatic HTTPS/SSL**: Netlify automatically provisions and renews your SSL certificate (HTTPS) without any extra configuration.
- **Faster Performance**: Netlify's DNS is served from their global edge network.
- **Simpler Management**: You confirm your domain once, and Netlify handles the tricky record settings for you.

---

## Step-by-Step Guide

### 1. In Netlify
1. Go to your **Site Overview** page.
2. Click on **Site Settings** > **Domain management**.
3. Click **Add a domain**.
4. Enter `isamelias.com` and click **Verify**.
5. Click **Yes, add domain**.
6. Click **Check DNS configuration** (or "Set up Netlify DNS").
7. Netlify will show you a list of **4 Nameservers** (e.g., `dns1.p01.nsone.net`, `dns2...`, etc.). **Keep this tab open.**

### 2. In GoDaddy
1. Log in to your GoDaddy account.
2. Go to your **DNS Management** page for `isamelias.com`.
3. Scroll down to the **Nameservers** section.
4. Click **Change**.
5. Switch from "Default" to **"Enter my own nameservers (advanced)"**.
6. Copy and paste the **4 nameservers from Netlify** into the fields. (Add more rows if needed).
7. Click **Save** and acknowledge the warning (it's safe!).

### 3. Wait for Propagation
- It can take anywhere from a few minutes to 24 hours for the changes to spread across the internet.
- Once connected, Netlify will automatically generate your HTTPS certificate.

---

### Alternative (Not Recommended)
You *can* keep your nameservers at GoDaddy and just point the "A Record" to Netlify's load balancer IP `75.2.60.5` and the "CNAME" for `www` to your Netlify site URL (e.g. `isamelias.netlify.app`), but:
- It's harder to troubleshoot.
- SSL setup is sometimes slower.
- You lose the benefits of Netlify's global DNS speed.
