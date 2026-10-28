#!/usr/bin/env python3
"""
ОАО «Коренёвский ПАТП» — Локальный сервер предварительного просмотра
Запуск: python3 run_local.py
После запуска сайт автоматически откроется в браузере по адресу http://localhost:8080
"""

import http.server
import socketserver
import webbrowser
import os

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

if __name__ == "__main__":
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 60)
        print(" ОАО «Коренёвский ПАТП» — Портал предприятия OMSI 2")
        print("=" * 60)
        print(f" Локальный сервер запущен: {url}")
        print(" Чтобы остановить сервер, нажмите Ctrl + C")
        print("=" * 60)
        
        try:
            webbrowser.open(url)
        except Exception:
            pass

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nСервер остановлен.")
