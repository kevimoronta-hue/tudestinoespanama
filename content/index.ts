/**
 * Aggregates the per-locale content files. Only lib/content.ts and lib/routing.ts
 * read from here; a CMS adapter would replace this module.
 */
import { articles as articlesEsEn } from "./articles";
import { articlesDe } from "./articles.de";
import { articlesFr } from "./articles.fr";
import { articlesIt } from "./articles.it";
import { opportunities as opportunitiesEsEn } from "./opportunities";
import { opportunitiesDe } from "./opportunities.de";
import { opportunitiesFr } from "./opportunities.fr";
import { opportunitiesIt } from "./opportunities.it";
import { professionals as professionalsEsEn } from "./professionals";
import { professionalsDe } from "./professionals.de";
import { professionalsFr } from "./professionals.fr";
import { professionalsIt } from "./professionals.it";
import { videos as videosEsEn } from "./videos";
import { videosDe } from "./videos.de";
import { videosFr } from "./videos.fr";
import { videosIt } from "./videos.it";

export const allArticles = [...articlesEsEn, ...articlesFr, ...articlesDe, ...articlesIt];
export const allProfessionals = [...professionalsEsEn, ...professionalsFr, ...professionalsDe, ...professionalsIt];
export const allOpportunities = [...opportunitiesEsEn, ...opportunitiesFr, ...opportunitiesDe, ...opportunitiesIt];
export const allVideos = [...videosEsEn, ...videosFr, ...videosDe, ...videosIt];
