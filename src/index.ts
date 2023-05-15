export default {
  async fetch(): Promise<Response> {
    return new Response("Gone", { status: 410 });
  },
};
