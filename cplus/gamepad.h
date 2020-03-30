#include <Windows.h>
#include <Xinput.h>

extern "C" __declspec(dllexport) void rumble(float x, float y, int dwMilliseconds);
