#include <thread>
#include "gamepad.h"

#pragma comment(lib, "XInput9_1_0.lib")

// Set gamepad vibration ('rumble')
void setRumble(float left = 0.0f, float right = 0.0f)
{
	// XInput vibration state
	XINPUT_VIBRATION rumble;

	// Zero memory on vibration state
	ZeroMemory(&rumble, sizeof(XINPUT_VIBRATION));

	// Calculate vibration intensity
	int left_motor  = int(left * 65535.0f);
	int right_motor = int(right * 65535.0f);

	rumble.wLeftMotorSpeed  = left_motor;
	rumble.wRightMotorSpeed = right_motor;

	// Apply vibration
	for (DWORD i=0; i< XUSER_MAX_COUNT; i++ ) {
		XInputSetState(i, &rumble);
	}
}

void rumble(float left, float right, int dwMilliseconds)
{

	setRumble(left, right);
	Sleep(dwMilliseconds);
	setRumble();
}
