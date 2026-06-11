Quick deploy checklist for Nginx + systemd/PM2

1) Build the app on the server

```bash
cd /path/to/your/app   # REPLACE
npm ci --production
npm run build
```

2) Start the app (systemd)

```bash
# copy deploy/systemd/nextapp.service to /etc/systemd/system/nextapp.service
sudo systemctl daemon-reload
sudo systemctl enable nextapp
sudo systemctl start nextapp
sudo journalctl -u nextapp -f
```

Or use PM2 (recommended for zero-downtime restarts):

```bash
# install pm2 globally
npm i -g pm2
# update cwd in deploy/ecosystem.config.js then:
pm ci
pm run build
pm2 start deploy/ecosystem.config.js
pm2 logs thermovault-next --lines 200
```

3) Nginx
- Copy `deploy/nginx-site.conf` to `/etc/nginx/sites-available/thermovault` and symlink to sites-enabled.
- Replace `server_name` and any path placeholders.
- Test and reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

4) Debugging tips
- 502/504: Check `sudo ss -ltnp` to ensure Node is listening on `127.0.0.1:3000` and check `/var/log/nginx/thermovault.error.log` and your app logs (systemd or pm2).
- 404 on dynamic routes: ensure Nginx is proxying `/_next/` and falling back to `@next` (see sample). Also verify link casing.
- If hosting under a subpath (example.com/app/): set `basePath` and `assetPrefix` in `next.config.ts` and update Nginx to strip the prefix before proxying.

If you give me the exact Nginx logs and the Next.js error output, I will pinpoint the fix and update these configs automatically.
