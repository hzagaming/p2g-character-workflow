FROM node:22-bookworm-slim

WORKDIR /app

# Python runtime for rembg (and some wheels need these libs)
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 python3-pip python3-venv \
  && rm -rf /var/lib/apt/lists/*

# Install server dependencies first (better layer caching)
COPY server/package.json server/package-lock.json ./server/
RUN npm --prefix server ci

# Install python dependencies for rembg (PEP 668-safe: install into venv)
COPY server/requirements.txt ./server/requirements.txt
RUN python3 -m venv /opt/rembg-venv \
  && /opt/rembg-venv/bin/python -m pip install --no-cache-dir --upgrade pip setuptools wheel \
  && /opt/rembg-venv/bin/python -m pip install --no-cache-dir -r server/requirements.txt

# Copy the rest of the repo (server needs scripts + prompts paths etc.)
COPY . .

ENV NODE_ENV=production
ENV PORT=3001

# Ensure rembg uses venv python
ENV REMBG_PYTHON_PATH=/opt/rembg-venv/bin/python
ENV PATH="/opt/rembg-venv/bin:${PATH}"

EXPOSE 3001

CMD ["npm", "--prefix", "server", "run", "start"]

