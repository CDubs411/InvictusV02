from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        page.goto("http://localhost:3000/calendar", wait_until="networkidle")

        # Wait for the main heading to be visible
        expect(page.get_by_role("heading", name="Calendar")).to_be_visible(timeout=30000)

        # Click the "Add Event" button
        add_event_button = page.get_by_role("button", name="Add Event")
        expect(add_event_button).to_be_visible()
        add_event_button.click()

        # Fill out the form
        page.get_by_label("Event Title").fill("Test Event")
        page.get_by_label("Event Type").click()
        page.get_by_role("option", name="Meeting").click()

        page.get_by_label("Start Date").fill("2025-08-06")
        page.get_by_label("Start Time").fill("10:00")
        page.get_by_label("End Date").fill("2025-08-06")
        page.get_by_label("End Time").fill("11:00")

        page.get_by_label("Contact").click()
        # This assumes there is at least one contact.
        # In a real test, you might want to create one first or handle the case where there are none.
        page.get_by_role("option").first.click()

        page.get_by_label("Location").fill("Test Location")
        page.get_by_label("Description").fill("This is a test event created by an automated script.")

        # Click the "Create Event" button
        create_button = page.get_by_role("button", name="Create Event")
        create_button.click()

        # Wait for the success toast to appear
        expect(page.get_by_text("Event created successfully.")).to_be_visible()

        # Wait for the event to appear in the calendar (agenda view)
        expect(page.get_by_text("Test Event")).to_be_visible()

        page.screenshot(path="jules-scratch/verification/verification.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
