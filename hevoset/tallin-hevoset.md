---
layout: default
title: Tallin hevoset
theme: horses
---

# Tallin hevoset

Tallin omat hevoset, joita käytetään ratsastuskoulun tunneilla ja kilpailuissa.

<hr>

{% if site.hevoset.size > 0 %}
{% assign sorted_horses = site.hevoset | sort: "name" %}
{% for horse in sorted_horses %}
### [{{ horse.name }}]({{ horse.url | relative_url }})
{% if horse.shortname %}*"{{ horse.shortname }}"*{% endif %}

{% if horse.breed %}**{{ horse.breed }}**{% endif %}{% if horse.gender %} · {{ horse.gender }}{% endif %}{% if horse.height %} · {{ horse.height }} cm{% endif %}

{% if horse.short_description %}{{ horse.short_description }}{% endif %}

<hr>
{% endfor %}
{% else %}
*(Hevostietoja ladataan...)*
{% endif %}
