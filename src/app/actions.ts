"use server";

import { sanityFetch } from "@/sanity/lib/client";
import { paginatedServicesQuery } from "@/sanity/lib/queries";
import { Service } from "@/types";

interface GetServicesParams {
  category?: string;
  start?: number;
  end?: number;
}

export async function getServicesAction({
  category,
  start = 0,
  end = 11,
}: GetServicesParams) {
  try {
    const services = await sanityFetch<Service[]>({
      query: paginatedServicesQuery,
      params: {
        category: category || null,
        start,
        end,
      },
      tags: ["service"],
    });

    return services;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}
