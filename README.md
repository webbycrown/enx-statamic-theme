# ENX — Statamic Starter Kit

An agency and corporate starter kit for [Statamic](https://statamic.com/) 5.  
Built to showcase services, case studies, insights, team, careers, and support.

Every marketing page uses one global **Page** template. Add, remove, or reorder Theme sections in the Control Panel. Collection details (service, case study, insight, team) keep their own entry templates.

Third-party library notices: [THIRD_PARTY.md](THIRD_PARTY.md).

---

## What's included

### One Page template + Theme sections

Editors add any section on any page and drag to reorder.

Available sections include home heroes, about, services, case studies, insights, team, careers, contact, support, FAQs listing, testimonials listing, offices listing, legal/policy copy, sitemap, and landing showcase. Listing variants (insights / case studies / teams) are composed from those sections — not extra page templates.

### Collections

| Collection | Purpose |
|---|---|
| Pages | Site pages — built with Theme sections |
| Services | Service offerings (detail view dedicated) |
| Case studies | Project write-ups (detail + category dedicated) |
| Insights | Articles (detail + category dedicated) |
| Teams | Staff profiles (detail dedicated) |
| Job positions | Open roles |
| Clients | Logos |
| Testimonials | Quotes |
| FAQs | Support answers |
| Locations | Offices |

### Forms

| Handle | Purpose |
|---|---|
| `contact` | Contact |
| `career` | Job application |
| `support` | Support ticket |
| `subscription` | Newsletter |
| `insight_comment` | Insight comments |

> **Statamic forms note:** Statamic Core includes one form. Extra forms require a [Statamic Pro](https://statamic.com/pricing) licence.

### Globals and navigation

Site logo, header/footer chrome, and social links live in **Setting** / **Footer** globals. Header links use **Header menu** (`nav:header_menu`).

---

## Installation

Follow the [Starter Kit installation instructions](https://statamic.dev/starter-kits/installing-a-starter-kit).  
Use **Statamic 5.x**.

```bash
php please starter-kit:install webbycrown/enx-statamic-theme
```

```bash
statamic new my-site webbycrown/enx-statamic-theme
```

After installation:

1. Open **Globals** for logo and footer copy.
2. Edit **Navigation → Header menu**.
3. Open any **Page** and reorder **Theme sections**.

---

## Pages in this kit

Home, Home two, About, Why ENX, Services, Case studies (two layouts), Insights (two layouts), Team (two layouts), Careers, Support, FAQ, Clients, Offices, Testimonials, Sitemap, Contact, and legal pages (privacy, terms, cookie, data protection, licensing).

Service, case study, insight, and team **detail** URLs use collection templates.

---

## Support

[Submit an issue on GitHub →](https://github.com/webbycrown/enx-statamic-theme/issues)

## Changelog

### v1.0.0

- Initial marketplace release
- One global Page template with Theme sections
- Services, case studies, insights, team, careers, and support
- Native header menu and globals
- Third-party notices for CDN libraries

---
<div align="center">
  <strong>Made with ❤️ by <a href="https://www.webbycrown.com/custom-statamic-development-services-company/">WebbyCrown Solutions</a></strong>
</div>
