# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added

- `GET /` — landing page that displays project description and a styled list of all available API endpoints (PR #5).

### Fixed

- `GET /api/users` — no longer returns HTTP 500 when the users store is empty. The route now correctly returns an empty array `[]` (PR #4).
