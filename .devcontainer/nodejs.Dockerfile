ARG VARIANT="20-bookworm"
FROM node:${VARIANT}

ARG USERNAME=node

RUN corepack enable pnpm

RUN apt-get update \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

USER $USERNAME