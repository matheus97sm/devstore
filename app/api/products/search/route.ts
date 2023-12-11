import { NextRequest } from "next/server";
import data from "../data.json";
import { z } from "zod";

export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { searchParams } = request.nextUrl;

  const query = z.string().parse(searchParams.get("q"));

  const products = data.products.filter((product) =>
    product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );

  if (!products.length) {
    return Response.json(
      {
        message: `Product ${query} not found`,
      },
      {
        status: 400,
      }
    );
  }

  return Response.json(products);
}
